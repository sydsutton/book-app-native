import React, {Component} from 'react';
import { View, StyleSheet, ImageBackground, FlatList, Image, ScrollView } from "react-native"
import { Card, Button, Icon, Text, Overlay, SearchBar } from "react-native-elements"
import { connect } from "react-redux"

const mapStateToProps = (state) => {
    return {
        books: state.books,
    }
}

class HomeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            search: ""
        }
    }

    toggleOverlay = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    updateSearch = (search) => {
        this.setState({
            search
        })
    }

    render(){

        const {books} = this.props
        const {search} = this.state

        const RenderBooks = ({item}) => {
            return (
                <View>
                    <Card containerStyle={{backgroundColor: "rgba(255,255,255,0.6)", borderWidth: 2, borderColor: "white"}}>
                        <Image 
                            source={item.imageLink}
                            style={styles.image}
                        />
                        <Text style={styles.text}>{item.title}</Text>
                        <Text style={{paddingBottom: 10}}>{item.author}</Text>
                        <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around"}}>
                            <Button 
                                buttonStyle={{width: 100}}
                                title="save"
                                onPress={() => alert(item.title)}
                            />
                            <Button 
                                type="outline" 
                                buttonStyle={{width: 100}}
                                title="more info"
                                onPress={this.toggleOverlay}
                            />
                        </View>
                        <View>
                            <Overlay backdropStyle={{opacity: .4}} isVisible={this.state.isOpen} onBackdropPress={this.toggleOverlay}>
                                <Card>
                                    <Text>{item.title}</Text>
                                    <Text>{item.author}</Text>
                                </Card>
                            </Overlay>
                        </View>
                    </Card>
                </View>
            )
        }
        return (
            <ImageBackground source={require("../images/backgroundImage.jpg")} style={{resizeMode: "cover", flex: 1}}>
                <View>
                    <ScrollView>
                        <SearchBar
                            placeholder="Search for a book"
                            lightTheme
                            containerStyle={{backgroundColor: "transparent"}}
                            inputContainerStyle={{backgroundColor: "#fff", borderRadius: 30}}
                            onChangeText={this.updateSearch}
                            value={search}
                        />
                        <View style={{height: 400}}>
                        </View>
                        <Text style={{fontSize: 25, fontWeight: "bold"}}>100 Must-Read Books of All Time</Text>
                        <FlatList
                            horizontal
                            data={books}
                            renderItem={RenderBooks}
                            keyExtractor={(item, index) => 'key'+index}
                        >
                        </FlatList>
                    </ScrollView>
                </View>
            </ImageBackground>
        );    
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        paddingTop: 10, 
        flex: 1,
        flexWrap: "wrap",
        width: 200
    },
    image: {
        height: 300,
        width: 200,
        resizeMode: "cover"
    }
})

export default connect(mapStateToProps)(HomeComponent)