import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { PostItem } from '../../api/api';
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { HEIGHT, MARGIN, PADDING, WIDTH } from "../../constants/constants";
import moment from 'moment'

type PostPropsType = {
    item: PostItem
}

export function Post({item}:PostPropsType) {
  return (
    <View>
    <View style={styles.postHeader}>
      <Text>{item.name}</Text>
      <Text>{moment(item.createdAt).fromNow()}</Text>
      <TouchableOpacity>
        <Entypo name="dots-three-horizontal" size={24} />
      </TouchableOpacity>
    </View>
    <Image source={{ uri: item.selectedFile }} style={styles.image} />
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: PADDING,
        marginVertical: MARGIN,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity>
          {item.likes.includes(item._id) ? (
            <AntDesign name="like1" size={24} />
          ) : (
            <AntDesign name="like2" size={24} />
          )}
        </TouchableOpacity>
        <Text style={{ marginLeft: MARGIN / 2 }}>{item.likes.length} likes</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity>
          <MaterialIcons name="delete-outline" size={24} />
        </TouchableOpacity>
        <Text style={{ marginLeft: MARGIN / 2 }}>delete</Text>
      </View>
    </View>
    <View style={{ paddingHorizontal: PADDING }}>
      <Text
        style={{ fontSize: 26, fontWeight: "600", marginBottom: MARGIN }}
      >
        {item.title}
      </Text>
      <Text style={{ marginBottom: MARGIN }}>{item.message}</Text>
      <Text style={{ marginBottom: MARGIN }}>{item.tags.map((tag) => `#${tag}`).join(" ")}</Text>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    postHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: PADDING,
      marginVertical: MARGIN,
      alignItems: "center",
    },
    image: {
      width: WIDTH,
      height: WIDTH,
    },
  });