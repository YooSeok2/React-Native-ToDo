import React, { Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { AntDesign } from '@expo/vector-icons';
import ProductIntro from '../managerviews/ProductIntro';
import EndTrade from '../managerviews/EndTrade'

const renderTabBar = props=>{
    return(
         <TabBar 
            {...props} 
            indicatorStyle={{backgroundColor : "transperant"}}
            style ={{backgroundColor:"white", borderTopColor : "#dadada", borderBottomColor : "#dadada"}} 
            activeColor={"#feb915"}
            inactiveColor={"#909090"} 
            pressColor={"#dadada"} 
            pressOpacity={0.2}
          />
          );
}

const initialLayout = {width : Dimensions.get('window').width};

const ProductIntroRoute = ()=>{
    return <ProductIntro />
 }
 
const EndTradeRoute = ()=>{
    return <EndTrade/>
}

export default class Manager extends Component{
    constructor(props){
        super(props);
        this.state = {
            manageInfo : {},
            checkGetData : false,
            index : 0,
            routes : [
                {key : 'intro', title : '상품소개'},
                {key : 'endtrade',title : '마감거래'}
            ]
        }
    }
    componentDidMount(){
        const {expertId} = this.props.route.params;
        fetch('https://thehanpam.co/api/products/'+expertId)
        .then((res)=> res.json())
        .then((res)=> this.setState({manageInfo : res.data}))
        .then((res)=> this.setState({checkGetData : true}));
    }

    getFloatFixed = (value, fixed) => {
        return parseFloat(Math.round(value * 100) / 100).toFixed(fixed);
    };

    
    
    render(){
        const {manageInfo, checkGetData, routes, index} = this.state;

        const renderScene = SceneMap({
            intro : ProductIntroRoute,
            endtrade : EndTradeRoute
        });
        
        return( 
            checkGetData 
            ? 
            <View style={styles.container} >
                <View style = {styles.header} >
                    <Text style = {styles.headerTitle}>{manageInfo.cts_type}</Text>
                    <TouchableOpacity onPress={this.clickHeaderListener}>
                        <AntDesign name="close" size={25} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.title}>
                    <Image style={styles.titleImg} source={{uri : manageInfo.manager_img}} />
                    <View style={styles.titleCont}>
                        <View style={styles.contDetail}>
                            <Text style={styles.detailTxt}>주간</Text>
                            <Text style={[styles.ratio,manageInfo.current_week_profit_ratio > 0 ? styles.plusRatio : styles.minusRatio]}>{this.getFloatFixed(manageInfo.current_week_profit_ratio, 2)}%</Text>
                        </View>
                        <View style={styles.contDetail}>
                            <Text style={styles.detailTxt}>월간</Text>
                            <Text style={[styles.ratio,manageInfo.current_month_profit_ratio > 0 ? styles.plusRatio : styles.minusRatio]}>{this.getFloatFixed(manageInfo.current_month_profit_ratio, 2)}%</Text>
                        </View>
                        <View style={styles.contDetail}>
                            <Text style={styles.detailTxt}>누적</Text>
                            <Text style={[styles.ratio,manageInfo.current_cumulative_profit_ratio > 0 ? styles.plusRatio : styles.minusRatio]}>{this.getFloatFixed(manageInfo.current_month_profit_ratio, 2)}%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.tabView}>
                    <TabView
                        navigationState = {{index, routes}}
                        renderScene = {renderScene}
                        onIndexChange= {this._changeIndex}
                        initialLayout={initialLayout}
                        tabBarPosition ={'top'}
                        renderTabBar = {renderTabBar}
                    />
                </View>
            </View>
            :
            <View style={styles.container}></View>
        )
    }

    clickHeaderListener = ()=>{
        const {navigation}  = this.props;
        navigation.popToTop();
        
    }

    _changeIndex = (index)=>{
        this.setState({
          index : index
        });
      }
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    header : {
        flexDirection : 'row',
        height : 50,
        backgroundColor : '#feb915',
        paddingHorizontal : 15,
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    headerTitle : {
        fontSize : 20,
        color : '#ffffff'
    },
    title : {
        height : 100,
        marginVertical : 10,
        backgroundColor : '#ffffff',
        flexDirection : 'row',
        paddingHorizontal : 30,
        alignItems : 'center'
    },
    titleImg : {
        borderRadius : 70,
        width : 70,
        height : 70
    },
    titleCont : {
        flex : 3,
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginLeft : 30
    },
    contDetail : {
        justifyContent : 'center',
        alignItems : 'center'
    },
    detailTxt : {
        color : '#808080',
        fontWeight : '100',
        fontSize : 13,
        
    },
    ratio : {
        fontSize : 16,
        fontWeight : '100'
    },
    plusRatio : {
        color : "#f81239"
    },
    minusRatio : {
        color : '#1263CE'
    },
    tabView : {
        flex : 1
    }
})