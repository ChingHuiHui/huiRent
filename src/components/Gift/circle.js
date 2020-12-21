import React, { useState } from "react"
import { Animated, Easing, View, TouchableOpacity, Image, StyleSheet, Dimensions, Text ,Alert} from "react-native"

function circle(props) {
    const [drawData, setdrawData] = useState([
        { id: 1, title: "", icon: require('./imgs/cry_coin.png') },
        { id: 2, title: "手机1", icon: require('./imgs/phone1_coin.png') },
        { id: 3, title: "+20金币", icon: require('./imgs/gold_coin.png') },
        { id: 4, title: "手机2", icon: require('./imgs/phone2_coin.png') },
        { id: 5, title: "手机50", icon: require('./imgs/gold_coin.png') },
        { id: 6, title: "+100金币", icon: require('./imgs/gold_coin.png') },
        { id: 7, title: "", icon: require('./imgs/cry_coin.png') },
        { id: 8, title: "手机3", icon: require('./imgs/phone3_coin.png') }
    ])
    const [offOn, setoffOn] = useState(true)
    const [rotateDeg, setrotateDeg] = useState(new Animated.Value(0))
    const confirm = () => {
        if(offOn){
        Alert.alert('花費點數抽獎','你確定要花費30點數抽獎嗎？',[
            {text:'取消'},
            {text:'確認',onPress:rotateImg},
        
        
        ])}else{Alert.alert('不要亂點啦拜託了')}

    }
    const rotateImg = () => {

        if (offOn) {
            rotateImg1();
        }
    };

    const rotateImg1 = () => {
        //获取抽奖位置
        setoffOn(!offOn)
        let number = Math.floor(Math.random() * 8);
        if ((number / 8) == 0.875) {
            number = 1;
        }
        let oneTimeRotate = number / 8 + 3.0625;
        Animated.timing(rotateDeg, {
            toValue: oneTimeRotate,
            duration: 5000,
            easing: Easing.out(Easing.quad)
        }).start(() => {
            // setoffOn(!offOn)
            //动画结束时，会把toValue值，回调给callback
            rotateDeg.stopAnimation(() => {
                changeValue(number);
            })
        });
    };
    const changeValue = (postion) => {
        alert("定位到了" + postion + "上了");
    };
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.mainImg, {
                transform: [{
                    rotate: rotateDeg.interpolate({
                        inputRange: [0, 3],
                        outputRange: ['0deg', '1080deg']
                    })
                }]
            }]}>
                <View style={{ height: 360, width: 360, alignItems: "center" }}>
                    <Image style={{ position: "absolute", height: 360, width: 360, resizeMode: 'stretch' }} source={require('./imgs/circle_bg.png')} />
                    {drawData.map((one, index) => {
                        const rotateDeg = 22.5;
                        let translateX = 0;
                        let translateY = 0;
                        const rotateTemp = -rotateDeg - (index * 45);
                        const sinTemp = Math.sin(rotateDeg * Math.PI / 180) * 105;
                        const consTemp = Math.cos(rotateDeg * Math.PI / 180) * 105;
                        switch (index) {
                            case 0:
                                translateX = -sinTemp;
                                translateY = -consTemp;
                                break;
                            case 1:
                                translateX = -consTemp;
                                translateY = -sinTemp;
                                break;
                            case 2:
                                translateX = -consTemp;
                                translateY = sinTemp;
                                break;
                            case 3:
                                translateX = -sinTemp;
                                translateY = consTemp;
                                break;
                            case 4:
                                translateX = sinTemp;
                                translateY = consTemp;
                                break;
                            case 5:
                                translateX = consTemp;
                                translateY = sinTemp;
                                break;
                            case 6:
                                translateX = consTemp;
                                translateY = -sinTemp;
                                break;
                            case 7:
                                translateX = sinTemp;
                                translateY = -consTemp;
                                break;
                            default:
                                break
                        }
                        return (
                            <View key={one.id} style={{ justifyContent: "center", alignItems: "center", position: "absolute", zIndex: 99, height: 70, width: 60, top: 145, transform: [{ translateX: translateX }, { translateY: translateY }, { rotateZ: `${rotateTemp}deg` }] }}>
                                <Text style={{fontSize:12, color:"#74340A",marginBottom:10}}>{one.title}</Text>
                                <Image style={{width: 50, height: 50, resizeMode: "contain" }} source={one.icon} />
                            </View>
                        )
                    })}
                </View >
            </Animated.View>
            <TouchableOpacity activeOpacity={0.9} onPress={() => { confirm() }} style={styles.centerPoint}>
                <Image source={require('./imgs/point_new.png')} style={{ height: 134, width: 107, resizeMode: "stretch", position: "absolute" }} />
                <Text style={{ color: "#ffffff", textAlign: "center", fontSize: 17, fontWeight: 'bold', width: 45, marginTop: 20 }}>{"開始抽獎" || "start game"}</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 360,
        alignItems: 'center',
        backgroundColor: "#ffffff"
    },
    imgPoint: {
        width: 100,
        height: 100,
    },
    centerPoint: {
        position: 'absolute',
        left: Dimensions.get('window').width / 2 - 53,
        top: 100,
        zIndex: 100,
        height: 134,
        width: 107,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainImg: {
        width: 360,
        height: 360,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    }
})
export default circle