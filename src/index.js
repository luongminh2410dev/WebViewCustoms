import React, { useState, useRef, useCallback } from 'react';
import { FlatList, Platform, ScrollView, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import data from './de_thi_toan.json';
import styles from './styles';
import { Metrics } from './ultilities';
const keyExtractor = (item, index) => `question_${index}`;
const App = (props) => {
    const [height, setHeight] = useState(0);
    const defaultOptions = {
        messageStyle: 'none',
        extensions: ['tex2jax.js'],
        'HTML-CSS': { linebreaks: { automatic: true } },
        jax: ['input/TeX', 'output/HTML-CSS'],
        tex2jax: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
        },
        TeX: {
            extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'],

        }
    };

    const onMessage = event => {
        setHeight(Number(event.nativeEvent.data));
    }

    const wrapMathjax = (content) => {
        const options = JSON.stringify(
            Object.assign({}, defaultOptions)
        );
        return `
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
            <script type="text/x-mathjax-config">
            MathJax.Hub.Config(${options});
            MathJax.Hub.Queue(function() {
                var height = document.documentElement.scrollHeight;
                window.ReactNativeWebView.postMessage(String(height));
                document.getElementById("formula").style.visibility = '';
            });
            </script>
			<script src="file:///android_asset/MathJax/MathJax.js"></script>
            <script src="./MathJax/MathJax.js"></script>
			<div id="formula" >
				${content}
			</div>
            <style>
            img{
                max-width: 100%;
                height: auto;
            }
            </style>
		`;
    }

    const renderItem = useCallback(({ item, index }) => {
        let html = wrapMathjax(`<p>Cau ${index + 1}: ${item.description}</p><p><b>A:</b> ${data[0].answer_a}</p><p><b>B: </b>${data[0].answer_b}</p><p><b>C: </b>${data[0].answer_c}</p><p><b>D: </b>${data[0].answer_d}</p>`)
        return (
            <WebView
                style={{ width: Metrics.DEVICE_WIDTH }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                source={{ html, baseUrl: Platform.OS === 'android' ? 'file:///android_asset/MathJax' : './MathJax' }}
            // onMessage={onMessage}
            />
        )
    }, [])
    return (
        <View style={styles.body}>
            <Text style={{ width: '100%', textAlign: 'center', fontSize: 20 }}>Hello Everyone</Text>
            <Text>Hello</Text>
            <FlatList
                data={data.slice(0, 20)}
                style={styles.list_item}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />

            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
        </View>
    )
}

export default App
