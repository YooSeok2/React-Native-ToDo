import React,{Component} from 'react';
import {View, Text, StyleSheet, Dimensions,TouchableOpacity, ScrollView} from 'react-native';
import {Chart,VerticalAxis,HorizontalAxis, Line} from "react-native-responsive-linechart";
import PropTypes from 'prop-types';


const {width} = Dimensions.get('window');
export default class ProductIntro extends Component{
    constructor(props){
        super(props);
        this.state = {
            productData : {},
            strategy : '',
            chartData : {},
            checkChartData : false,
            chartConfig : {
                vertical : {
                    labels: { formatter: (v) => Math.round(v).toFixed(2)+'%    ', label : {color : '#a9a9a9', fontSize : 9, fontWeight : 400}}, 
                    axis : 'none', 
                    ticks : {stroke : {color : '#fafafa', width : 1}}, 
                    grid : {stroke : {color: "#f2f2f2"}} 
                },
                horizontal : {
                    axis : {stroke : {color : '#fafafa', width : 1}},
                    labels :{label : {color : '#f2f2f2'}} 
                }
            },
            selectChartData : {},
            selectChart : 'year'
        }
    }

    componentDidMount(){
        const { expertId } = this.props;
        fetch('https://thehanpam.co/api/products/'+expertId)
        .then((res)=> res.json())
        .then((res) => {
            const chartData = res.data.profit_list;
            const chartArray = {
                year : [],
                month : [],
                week : []
            };

            const strategy = res.data.cts_strategy.split('<br>').map((line)=>{
                return line + "\n";
            });
            
            
            chartData.forEach((ele,index)=>{
                chartArray.year.push({x : index, y : ele});
            })
            this.setState({
                productData : res.data,
                strategy : strategy
            })

            return chartArray;
        })
        .then((res)=>{
            const chartArray = res;
            chartArray.month = chartArray.year.splice(chartArray.year.length-30,chartArray.year.length-1);
            chartArray.week = chartArray.year.splice(chartArray.year.length-7, chartArray.year.length-1);

            return chartArray;
        })
        .then((res)=>{
            this.setState({
                chartData : res,
                selectChartData : res.year
            })
        })
        .then((res)=>{
            this.setState({
                checkChartData : true
            })
        })
        .catch((err)=>console.error(err));
    }

    render(){
        const {selectChartData, checkChartData, chartConfig, selectChart,productData, strategy} =this.state;
    
        return(
            checkChartData
            ?
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
                <View style={styles.selectChartInfoBox} >
                    <TouchableOpacity style={styles.touchChart} onPress ={()=>this._clickChartFormat('year')}>
                            <View >
                                <Text style = {selectChart === 'year' ? styles.selectChart : styles.chartTxt}>1년</Text>
                            </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchChart} onPress ={()=>this._clickChartFormat('month')}>
                            <View>
                                <Text style = {selectChart === 'month' ? styles.selectChart : styles.chartTxt} >1개월</Text>
                            </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchChart} onPress ={()=>this._clickChartFormat('week')}>
                            <View>
                                <Text style = {selectChart === 'week' ? styles.selectChart : styles.chartTxt}>1주일</Text>
                            </View>
                    </TouchableOpacity>
                </View>
                <Chart
                    style={{ height: 150, width: width-40, marginBottom : 20 }}
                    data={selectChartData}
                    padding={{ left: 50, bottom: 20, right: 0, top: 20 }}
                    disableGestures = {true}
                >
                    <VerticalAxis tickCount={5} theme={chartConfig.vertical} />
                    <HorizontalAxis tickCount={0} theme = {chartConfig.horizontal} />
                    <Line theme={{ stroke: { color: '#f81239', width: 1 } }} />
                </Chart>
                <View style = {styles.productInfo} >
                    <Text style={styles.productTitle}>자문역</Text>
                    <Text style={styles.productVal}>{productData.cts_manager}</Text>
                </View>
                <View style = {styles.productInfo} >
                    <Text style={styles.productTitle}>경력</Text>
                    <Text style={styles.productVal}>{productData.cts_career}</Text>
                </View>
                <View style = {styles.productInfo} >
                    <Text style={styles.productTitle}>시작일</Text>
                    <Text style={styles.productVal}>{productData.cts_date}</Text>
                </View>
                <View style={styles.strategy} > 
                    <Text style={styles.strategyTitle}>투자전략</Text>
                    <Text style= {styles.strategyArticle}>{strategy}</Text>
                </View>
            </ScrollView>
            :
            <ScrollView style={styles.container} ></ScrollView>
        );
    }


    _clickChartFormat=(kinds)=>{
        const {chartData} = this.state;
        switch(kinds){
            case 'year' :
                this.setState({
                    selectChart : 'year',
                    selectChartData : chartData.year
                });
                break;
            case 'month' :
                this.setState({
                    selectChart : 'month',
                    selectChartData : chartData.month
                });
                break;
            case 'week' :
                this.setState({
                    selectChart : 'week',
                    selectChartData : chartData.week
                });
                break;
            default :
                break;
        }
    }
}

ProductIntro.propTypes = {
    expertId : PropTypes.string
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
        paddingHorizontal : 20
    },
    selectChartInfoBox : {
        flexDirection : 'row',
        paddingTop : 30,
        paddingBottom : 5,
        paddingHorizontal : '30%',
        justifyContent : 'space-between'
    },
    chartTxt : {
        color : '#c0c0c0',
        fontWeight : 'normal'
    },
    selectChart : {
        color : '#000000',
        fontWeight : 'bold'
    },
    touchChart : {
        paddingHorizontal : 5,
        paddingVertical : 5
    },
    productInfo : {
        height : 50,
        flexDirection : 'row',
        alignItems : 'center',
        borderBottomColor : '#f2f2f2',
        borderBottomWidth : 1
    },
    productTitle : {
        flex : 2,
        fontSize : 16,
        color : '#d3d3d3'
    },
    productVal : {
        flex : 5,
        fontSize : 16,
        color : '#1d1d1f'
    },
    strategy : {
       marginBottom : 10,
       marginTop : 30
    },
    strategyTitle : {
        fontSize : 20,
        fontWeight : 'bold'
    },
    strategyArticle :{
        fontSize : 16,
        marginTop : 20,
        lineHeight : 25
    }
})