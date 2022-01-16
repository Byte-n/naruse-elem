 export default {
  "type": "view",
  "style": {
    "position": "relative"
  },
  "childNodes": [
    {
      "type": "image",
      "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/特权.png",
      "style": {
        "width": "100%",
        "height": "665rpx",
        "marginTop": "36rpx"
      }
    },
    {
      "type": "view",
      "style": {
        "position": "relative"
      },
      "childNodes": [
        {
          "type": "view",
          "style": {
            "width": "508rpx",
            "position": "absolute",
            "bottom": "26rpx",
            "fontSize": "28rpx",
            "color": "#B58535",
            "left": "50%",
            "transform": "translateX(-50%)"
          },
          "childNodes": [
            {
              "type": "text",
              "childNodes": "累计已有 3,129,847 个卖家选择爱用商品"
            }
          ]
        }
      ]
    },
    {
      "type": "image",
      "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/评价.png",
      "style": {
        "width": "100%",
        "height": "933rpx"
      }
    },
    {
      "type": "view",
      "style": {
        "height": "120rpx"
      }
    },
    {
      "type": "image",
      "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/ios按钮.png",
      "onClick": [
        {
          "type": "contactWW",
          "props": {
            "text": "亲，我想升级爱用商品高级功能！https://tb.cn/H26EeGw"
          }
        }
      ],
      "style": {
        "width": "100%",
        "height": "110rpx",
        "position": "fixed",
        "bottom": 10,
        "zIndex": 10,
        "left": 0
      }
    }
  ]
}