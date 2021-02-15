import React,{Component} from 'react';
import {View, Text, StyleSheet,ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';


const {width}  = Dimensions.get('window');
export default class EndTrade extends Component{
    constructor(props){
        super(props);

        this.state = {
            tradeData : {},
            checkTradeData : false
        }
    }

    componentDidMount(){
        const {expertId} = this.props;
        fetch('https://thehanpam.co/api/products/'+expertId+'/endtrade/')
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            const tradeData = res.data.items;
             

            const parseTradeData = tradeData.map((data)=>{
                const registerDate = moment(data.register_date).format('YYYY.MM.DD');
                const endDate = moment(data.endDate).format('YYYY.MM.DD');
                const profitNum =  data.realized_profit_and_loss.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                
                const newTradeObj = {
                    ...data,
                    register_date : registerDate,
                    endDate : endDate,
                    realized_profit_and_loss : profitNum
                }
                
                return newTradeObj
            });

            this.setState({
                tradeData : parseTradeData
            })
        })
        .then((res)=>{
            this.setState({
                checkTradeData : true
            })
        }).catch((err)=>console.error(err));

    }

    render(){
        const {checkTradeData, tradeData} = this.state;
       
        return(
            checkTradeData
            ?
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
                <Text style={styles.title}>마감거래</Text>
                {tradeData.map((data, index)=>{
                  return(
                        <View style={styles.stockContainer} key={index}>
                            <Text style={styles.stockTitle}>{data.stockName}</Text>
                            <View style={styles.stockDate}>
                                <Text style= {styles.stockDateTxt}>보유기간 : </Text>
                                <Text style= {styles.stockDateTxt}>{data.register_date} ~ {data.endDate}</Text>
                            </View>
                            <View style={styles.profit}>
                                <View style={styles.profitLeft}>
                                    <Text style={styles.profitTxt}>수익률 : </Text>
                                    <Text style={data.ratio > 0 ? styles.profitPlus : styles.profitMinus}>{data.ratio}%</Text>
                                </View>
                                <View style={styles.profitRight}>
                                    <Text style={styles.profitTxt}>수익금 : </Text>
                                    <Text style={data.ratio > 0 ? styles.profitPlus : styles.profitMinus}>{data.realized_profit_and_loss}</Text>
                                </View>
                            </View>
                        </View>
                        )
                })}
                <View style={styles.footer}>
                    <Text style={styles.footerTxt}>증권사 수수료와 거래세가 공제되지 않았으며{'\n'}실제 손익과 일부 차이가 있을 수 있습니다.</Text>
                </View>
                
            </ScrollView>
            :
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={'#dadada'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
    },
    loading : {
        flex : 1,
        backgroundColor : 'white',
        justifyContent : 'center'
    },
    title : {
        fontSize : 18,
        fontWeight : 'bold',
        marginTop : 20,
        marginBottom : 10,
        paddingHorizontal : 20
    },
    stockContainer : {
        width : width,
        paddingVertical : 20,
        borderBottomWidth : 1,
        borderBottomColor : '#f2f2f2',
        paddingHorizontal : 20
    },
    stockTitle : {
        fontWeight : '700',
        fontSize : 16
    },
    stockDate : {
        flexDirection : 'row'
    },
    stockDateTxt : {
        fontSize : 15
        ,
        color : "#707070"
    },
    profit : {
        flexDirection : 'row'
    },
    profitLeft : {
        flexDirection : 'row',
        alignItems : 'center',
    },
    profitRight : {
        flexDirection : 'row',
        alignItems : 'center',
        marginLeft : 8
    },
    profitTxt : {
        color : '#707070',
        fontSize : 15
    },
    profitPlus : {
        color : '#f81239',
        fontSize : 15
    },
    profitMinus : {
        color : '#1263CE',
        fontSize : 15
    },
    spinnerTextStyle : {
        color : '#fff'
    },
    footer : {
        paddingVertical : 30,
        alignItems : 'center',
        justifyContent : 'center'
    },
    footerTxt : {
        color : '#707070',
        textAlign : 'center',
        lineHeight : 20
    }
})