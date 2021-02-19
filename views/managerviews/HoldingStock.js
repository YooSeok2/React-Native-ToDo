import React, { Component } from 'react';
import {View, StyleSheet, ActivityIndicator, Text, FlatList, SafeAreaView, Dimensions} from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Rect, G, Line, Circle, Text as SvgText  } from 'react-native-svg'
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window')
export default class HoldingStock extends Component{
    constructor(props){
        super(props);
        this.state = {
            holdingBalance : {},
            chartData : {},
            balanceRatio : {},
            allDataSetCheck : false
        }
    }

    componentDidMount(){
        const {expertId} = this.props;

        fetch('https://thehanpam.co/api/products/'+expertId+'/balance/')
        .then((res)=>res.json())
        .then((res)=>{
            const holdingBalance = res.data;
            const cash = holdingBalance.cash_amount;
            let stockCashNum = [];
            let balances = [];

            const stockCash = holdingBalance.items.filter((data)=>{
                return data.stockcode !== 'RKRW22';
            }).map((data)=>{
                const stockCash = {
                    code : data.stockcode,
                    cash : data.purchase_amount
                }
                stockCashNum.push(data.purchase_amount);
                balances.push({...data})
                return stockCash;
            });
            
            const totalCash = stockCashNum.reduce((acc, cur)=>{
                return acc+cur
            }, 0)+cash;
            
            const cashObj = {
                cash : cash,
                stockCash : [...stockCash],
                totalCash : totalCash
            };
            
            this.setState({
                holdingBalance : balances
            });
                
            return cashObj;
        })
        .then((res)=>{
            const divisionNum = (res.totalCash/100).toFixed(1);
            
            let chartData = [
                {
                    value : parseFloat((res.cash/divisionNum).toFixed(1)),
                    svg : {fill : '#feb915'},
                    key : 'cash',
                    arc: { outerRadius: '110%', padAngle : 0.1}
                }
            ]

            const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);

            res.stockCash.forEach((data, index)=>{
                chartData.push({
                    value : parseFloat((data.cash/divisionNum).toFixed(1)),
                    svg : {
                        fill : randomColor()
                    },
                    key : data.code,
                    arc : {outerRadius : '100%', padAngle : 0}
                })
            });


            const stockData = chartData.map((data)=>{
               return {
                    cashRatio : data.value,
                    code : data.key,
                    fill : data.svg.fill
                }
            })

            this.setState({chartData : chartData, balanceRatio : stockData});
        })
        .then((res)=>this.setState({allDataSetCheck : true}))
        .catch((err)=>console.error(err));
    }

    renderItem = ({item})=>{
        
        return (
            <View style={styles.stockView}>
                <View style={styles.stockTitle}>
                    <View style={styles.titleBox}>
                        <Text style={styles.stockName}>{item.stockName}</Text>
                        <Text style={styles.stockCode}>{item.stockcode}</Text>
                    </View>
                    <View style={styles.titleBox}>
                        <View style={[styles.rect, {backgroundColor : item.fill}]} />
                        <Text style={styles.stockRatio}>{item.cashRatio}%</Text>
                    </View>
                </View>
                <View style={styles.stockHeader}>
                    <Text style={styles.headerTxt}>평가금액</Text>
                    <Text style={styles.headerTxt}>수익률</Text>
                    <Text style={styles.headerTxt}>평가손익</Text>
                </View>
                <View style={styles.stockBody}>
                    <Text style={styles.bodyTxt}>{item.valuation_amount}</Text>
                    <Text style={[styles.bodyTxt, item.interest_rate > 0 ? styles.plus : styles.minus ]}>{item.interest_rate}%</Text>
                    <Text style={[styles.bodyTxt, item.interest_rate > 0 ? styles.plus : styles.minus ]}>{item.valuation_gain_loss}</Text>
                </View>
                <View style={styles.stockHeader}>
                    <Text style={styles.headerTxt}>매입금액</Text>
                    <Text style={styles.headerTxt}>보유수량</Text>
                    <Text style={styles.headerTxt}>평균단가</Text>
                </View>
                <View style={styles.stockBody}>
                    <Text style={styles.bodyTxt}>{item.purchase_amount}</Text>
                    <Text style={styles.bodyTxt}>{item.balance_amount}</Text>
                    <Text style={styles.bodyTxt}>{item.average_price}</Text>
                </View>
            </View>
        )
    }

    

    
    render(){
        const {chartData, allDataSetCheck,holdingBalance, balanceRatio } = this.state;

        const getBalancesData = ()=>{
            const {holdingBalance, balanceRatio, allDataSetCheck} = this.state;
            let balances = []
            if(allDataSetCheck){
                holdingBalance.forEach((data,index)=>{
                    const sameBalances = balanceRatio.filter((val)=>{
                        return val.code === data.stockcode
                    })
                    
                    const newBalnceObj = {
                        ...data,
                        ...sameBalances[0]
                    }

                    balances.push(newBalnceObj);
                });
            }
               
            return balances;
        }

        const Labels = ({ slices }) => {
            const cashSlices = slices.filter((val)=>{
                return val.data.key === 'cash'
            });
            const { labelCentroid, pieCentroid, data } = cashSlices[0];
            
            return (
                <G key={data.key}>
                    <Circle
                        cx={ pieCentroid[ 0 ] }
                        cy={ pieCentroid[ 1 ] }
                        r={ 18 }
                        fill={ '#ffffff' }
                        stroke={data.svg.fill }
                    />
                    <SvgText
                        fill = "#feb915"
                        fontSize="15"
                        fontWeight="normal"
                        x = {pieCentroid[ 0 ]}
                        y ={pieCentroid[ 1 ]+5}
                        textAnchor="middle"
                        
                    >현금</SvgText>
                </G>
           )
        }

    
        return (
            allDataSetCheck
            ?
            <SafeAreaView style={styles.container}>
                <FlatList
                ListHeaderComponent = {
                    <>
                        <Text style={styles.title}>포트폴리오</Text>
                        <View style={styles.chartView}>
                            <View style={styles.pieChart}>
                                <PieChart 
                                    style={{ height: 250 }} 
                                    data={chartData} 
                                    innerRadius={35} 
                                    outerRadius={75} 
                                    labelRadius={110}
                                >
                                    <Labels/>
                                </PieChart>
                            </View>
                            <View style={styles.chartStatus}>
                                <View style={styles.statusBox}>
                                    <Text style={styles.statusCash}>현금비중 : </Text>
                                    <Text style={styles.statusCash}>{balanceRatio[0].cashRatio}%</Text>
                                </View>
                                <View style={styles.statusBox}>
                                    <Text style={styles.statusStock}>종목비중 : </Text>
                                    <Text style={styles.statusStock}>{100-balanceRatio[0].cashRatio}%</Text>
                                </View>
                            </View>
                        </View>
                    </>
                }
                    showsVerticalScrollIndicator={false}
                    data = {getBalancesData()}
                    renderItem = {this.renderItem}
                    keyExtractor={(item)=>item.code}
                />
            </SafeAreaView>
            :
            <SafeAreaView style={styles.loading}>
                <ActivityIndicator size="large" color={'#dadada'}/>
            </SafeAreaView>
            
        )
    }
    
}

HoldingStock.propTypes = {
    expertId : PropTypes.string
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
        paddingHorizontal : 15
    },
    loading : {
        flex : 1,
        backgroundColor : 'white',
        justifyContent : 'center'
    },
    title : {
        fontSize : 18,
        fontWeight : 'bold',
        paddingTop : 25
    },
    chartView : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    pieChart : {
        flex : 2
    },
    chartStatus : {
        flex : 1,
      
    },
    statusBox : {
        flexDirection : 'row'
    },
    statusCash : {
        fontSize : 13,
        fontWeight : 'bold'
    },
    statusStock : {
        fontSize : 13,
        fontWeight : 'normal'
    },
    stockTitle : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingVertical : 5
    },
    stockHeader : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal : 35,
        paddingVertical : 6,
        borderBottomColor : '#f2f2f2',
        borderBottomWidth : 1,
        borderTopColor : '#f2f2f2',
        borderTopWidth : 1
    },
    stockBody : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal : 35,
        paddingVertical : 12
    },
    headerTxt : {
        color : '#707070',
        fontSize : 15,
        fontWeight : '100'
    },
    bodyTxt:{
        fontSize : 17,
        color : '#1d1d1f',
    },
    plus : {
        color : '#f81239'
    },
    minus : {
        color : '#1263CE'
    },
    stockView : {
        marginTop : 20
    },
    titleBox : {
        flexDirection : 'row',
        paddingVertical : 5,
        alignItems : 'center'
    },
    rect : {
        width : 10,
        height : 10
    },
    stockName : {
        fontSize : 15
    },
    stockCode : {
        fontSize : 15,
        marginLeft : 5,
        color : '#707070'
    },
    stockRatio : {
        marginLeft : 8,
        color : '#707070'
    }
})