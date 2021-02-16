import React,{Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ActivityIndicator, SafeAreaView, FlatList, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReportDetail from '../components/ReportDetail';


const {width}  = Dimensions.get('window');
export default class Report extends Component{
    constructor(props){
        super(props);
        this.state = {
            reportData : [],
            checkReportData : false,
            modalVisible : false,
            reportId : ''
        }
    }

    componentDidMount(){
        const {expertId,companyName} = this.props;

        fetch('https://thehanpam.co:444/business_supervisors/stock_reports/?company='+companyName+'&expert_id='+expertId)
        .then((res)=>res.json())
        .then((res)=>{
            const reportData = res.map((data)=>{
                const registDate = moment(data.registDate).format('YYYY-MM-DD HH:mm:ss');
                const newReportObj = {
                    ...data,
                    registDate : registDate
                };

                return newReportObj
            })
            this.setState({
                reportData :reportData.reverse()
            })
        })
        .then((res)=>{
            this.setState({
                checkReportData : true
            })
        })
    }

    closeModal = ()=>{
        this.setState({
            modalVisible : false
        })
    }

    openModal =(unique)=>{
        this.setState({
            modalVisible : true,
            reportId : unique
        });
    }

    renderItem = ({item}) => {
        
        return (
            <Pressable style={styles.reportContainer} onPress={()=>this.openModal(item.unique)}>
                <Text style={styles.reportTitle}>{item.title}</Text>
                <Text style={styles.reportData}>{item.registDate}</Text>
            </Pressable>
        )
    }

    render(){
        const {checkReportData,reportData, modalVisible, reportId} = this.state;
        return(
            checkReportData
            ?
            <SafeAreaView style={styles.container}>
                <FlatList
                    data ={reportData}
                    renderItem = {this.renderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item)=>item.unique}
                />
                <ReportDetail modalVisible={modalVisible} setModalVisible={this.closeModal} unique = {reportId}/>
            </SafeAreaView>
            
            :
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={'#dadada'}/>
            </View>
        )
    }
}

Report.propTypes = {
    expertId : PropTypes.string,
    companyName : PropTypes.string
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white'
    },
    loading : {
        flex : 1,
        backgroundColor : 'white',
        justifyContent : 'center'
    },
    reportContainer : {
        width : width,
        paddingVertical : 20,
        paddingHorizontal : 15,
        borderBottomColor : '#f2f2f2',
        borderBottomWidth : 1
    },
    reportTitle : {
        fontWeight : 'normal',
        fontSize : 15
    },
    reportData : {
        fontSize : 13,
        color : '#707070'
    }
})