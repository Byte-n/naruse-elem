 export default {
  "type": "view",
  "style": {
    "position": "relative",
    "width": "100%"
  },
  "childNodes": [
    {
      "type": "view",
      "style": {
        "maxWidth": "100%",
        "background": "#F4C856",
        "borderRadius": "1rpx",
        "padding": "28rpx"
      },
      "childNodes": [
        {
          "type": "view",
          "id": "剩余事件",
          "style": {
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "space-between",
            "fontSize": "32rpx",
            "fontFamily": "PingFangSC-Medium, PingFang SC",
            "fontWeight": 500,
            "color": "#ED3C23"
          },
          "childNodes": [
            {
              "type": "view",
              "childNodes": [
                {
                  "type": "text",
                  "childNodes": "您的试用模式剩余"
                },
                {
                  "isDynamicText": true,
                  "type": "text",
                  "childNodes": "赠送剩余过期天数"
                },
                {
                  "type": "text",
                  "childNodes": "天"
                }
              ]
            },
            {
              "type": "image",
              "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/图标.png",
              "style": {
                "width": "220rpx",
                "height": "40rpx"
              }
            }
          ]
        }
      ]
    },
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
          "type": "image",
          "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/自由选择.png",
          "style": {
            "width": "450rpx",
            "height": "40rpx",
            "marginLeft": "150rpx",
            "marginTop": "36rpx"
          }
        },
        {
          "type": "view",
          "style": {
            "width": "508rpx",
            "position": "absolute",
            "bottom": "110rpx",
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
      "type": "view",
      "style": {
        "width": "100%",
        "height": "300rpx",
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center"
      },
      "childNodes": [
        {
          "type": "image",
          "id": "selectBtn-季度未选中",
          "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/季度未选中.png",
          "style": {
            "width": "210rpx",
            "height": "250rpx",
            "marginLeft": "14rpx",
            "marginRight": "14rpx"
          },
          "onClick": [
            {
              "type": "changeDom",
              "targetId": "bottomBtn",
              "props": {
                "onClick": [
                  {
                    "type": "gotoWebPage",
                    "props": {
                      "url": "https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_210520165254%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007049474%5D&subParams=cycleNum%3A3%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=792D9F1FD3404BFE05AAC79EC2C51A25",
                      "isShopLink": true
                    }
                  }
                ],
                "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/季度按钮.png"
              }
            },
            {
              "type": "changeDom",
              "targetId": "selectBtn-季度未选中",
              "props": {
                "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/季度选中.png"
              }
            },
            {
              "type": "changeDom",
              "targetId": "selectBtn-半年选中",
              "props": {
                "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/半年未选中.png"
              }
            },
            {
              "type": "changeDom",
              "targetId": "selectBtn-一年未选中",
              "props": {
                "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/一年未选中.png"
              }
            }
          ]
        },
        {
          "type": "image",
          "id": "selectBtn-半年选中",
          "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/半年选中.png",
          "style": {
            "width": "210rpx",
            "height": "250rpx",
            "marginLeft": "14rpx",
            "marginRight": "14rpx"
          },
          "onClick": [
            {
              "type": "changeDom",
              "targetId": "bottomBtn",
              "props": {
                "onClick": [
                  {
                    "type": "gotoWebPage",
                    "props": {
                      "url": "https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_210520165254%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007049474%5D&subParams=cycleNum%3A6%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=C093214C834DB95FDE3BBCEE9085C0ED",
                      "isShopLink": true
                    }
                  }
                ],
                "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/半年按钮.png"
              }
            },
            {
              "type": "changeDom",
              "targetId": "selectBtn-半年选中",
              "props": {
                "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/半年选中.png"
              }
            },
            {
              "type": "changeDom",
              "targetId": "selectBtn-季度未选中",
              "props": {
                "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/季度未选中.png"
              }
            },
            {
              "type": "changeDom",
              "targetId": "selectBtn-一年未选中",
              "props": {
                "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/一年未选中.png"
              }
            }
          ]
        },
        {
          "type": "image",
          "id": "selectBtn-一年未选中",
          "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/一年未选中.png",
          "style": {
            "width": "210rpx",
            "height": "250rpx",
            "marginLeft": "14rpx",
            "marginRight": "14rpx"
          },
          "onClick": [
            {
              "type": "changeDom",
              "targetId": "bottomBtn",
              "props": {
                "onClick": [
                  {
                    "type": "gotoWebPage",
                    "props": {
                      "url": "https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_210520165254%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007049474%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=3C4469CCF2C31583D06B5D14B61BF043",
                      "isShopLink": true
                    }
                  }
                ],
                "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/年按钮.png"
              }
            },
            {
              "type": "changeDom",
              "targetId": "selectBtn-一年未选中",
              "props": {
                "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/一年选中.png"
              }
            },
            {
              "type": "changeDom",
              "targetId": "selectBtn-季度未选中",
              "props": {
                "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/季度未选中.png"
              }
            },
            {
              "type": "changeDom",
              "targetId": "selectBtn-半年选中",
              "props": {
                "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/半年未选中.png"
              }
            }
          ]
        }
      ]
    },
    {
      "type": "view",
      "style": {
        "marginLeft": "36rpx",
        "marginTop": "10rpx",
        "fontSize": "24rpx",
        "color": "#333333"
      },
      "childNodes": [
        {
          "type": "text",
          "childNodes": "购买后七天无理由退钱"
        }
      ]
    },
    {
      "type": "view",
      "style": {
        "height": "120rpx"
      }
    },
    {
      "type": "image",
      "id": "bottomBtn",
      "onClick": [
        {
          "type": "gotoWebPage",
          "props": {
            "url": "https://c.tb.cn/Y4.SvhWK",
            "isShopLink": true
          }
        }
      ],
      "src": "https://q.aiyongtech.com/trade/web/images/caro/testModal/半年按钮.png",
      "style": {
        "width": "100%",
        "height": "110rpx",
        "position": "fixed",
        "bottom": 0,
        "zIndex": 10,
        "left": 0
      }
    }
  ]
}