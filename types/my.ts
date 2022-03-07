declare interface IFailResult {
    ():any;
}
declare namespace my.ap {
    export function ARScan(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function addAppToMyApps(r: {
      appId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function addCardAuth(r: {
      /**
       * @summary 开卡授权的页面地址，从接口获取。
       */
      url: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(
        data:
          | {
              success: true;
              resultStatus: '9000';
              result: {
                /**
                 * @summary 应用 ID。
                 */
                app_id: string;
                /**
                 * @summary 授权码，用于换取 authtoken。
                 */
                auth_code: string;
                /**
                 * @summary 授权的 state。
                 */
                state: string;
                /**
                 * @summary 授权 scope。
                 */
                scope: string;
                /**
                 * @summary 会员卡模板 ID。
                 */
                template_id: string;
                /**
                 * @summary 会员卡表单信息请求 ID。
                 */
                request_id: string;
                /**
                 * @summary 会员卡领卡链接透传参数。
                 */
                out_string: string;
              };
            }
          | {
              success: false;
              code:
                | 'JSAPI_SERVICE_TERMINATED'
                | 'JSAPI_PARAM_INVALID'
                | 'JSAPI_SYSTEM_ERROR'
                | 'ILLEGAL_NULL_ARGUMENT'
                | 'INVALID_APPLY_CARD_LINK'
                | 'OPEN_FORM_TEMPLATE_NOT_EXIST'
                | 'ALREADY_ACTIVE_CARD'
                | 'OPEN_FORM_FIELD_NOT_PERMITTED'
                | 'OPEN_FORM_USER_LACK_INFO'
                | 'SYSTEM_ERROR';
            },
      ): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | (
              | {
                  success: true;
                  resultStatus: '9000';
                  result: {
                    /**
                     * @summary 应用 ID。
                     */
                    app_id: string;
                    /**
                     * @summary 授权码，用于换取 authtoken。
                     */
                    auth_code: string;
                    /**
                     * @summary 授权的 state。
                     */
                    state: string;
                    /**
                     * @summary 授权 scope。
                     */
                    scope: string;
                    /**
                     * @summary 会员卡模板 ID。
                     */
                    template_id: string;
                    /**
                     * @summary 会员卡表单信息请求 ID。
                     */
                    request_id: string;
                    /**
                     * @summary 会员卡领卡链接透传参数。
                     */
                    out_string: string;
                  };
                }
              | {
                  success: false;
                  code:
                    | 'JSAPI_SERVICE_TERMINATED'
                    | 'JSAPI_PARAM_INVALID'
                    | 'JSAPI_SYSTEM_ERROR'
                    | 'ILLEGAL_NULL_ARGUMENT'
                    | 'INVALID_APPLY_CARD_LINK'
                    | 'OPEN_FORM_TEMPLATE_NOT_EXIST'
                    | 'ALREADY_ACTIVE_CARD'
                    | 'OPEN_FORM_FIELD_NOT_PERMITTED'
                    | 'OPEN_FORM_USER_LACK_INFO'
                    | 'SYSTEM_ERROR';
                }
            )
          | IFailResult,
      ): void;
    }): Promise<
      | {
          success: true;
          resultStatus: '9000';
          result: {
            /**
             * @summary 应用 ID。
             */
            app_id: string;
            /**
             * @summary 授权码，用于换取 authtoken。
             */
            auth_code: string;
            /**
             * @summary 授权的 state。
             */
            state: string;
            /**
             * @summary 授权 scope。
             */
            scope: string;
            /**
             * @summary 会员卡模板 ID。
             */
            template_id: string;
            /**
             * @summary 会员卡表单信息请求 ID。
             */
            request_id: string;
            /**
             * @summary 会员卡领卡链接透传参数。
             */
            out_string: string;
          };
        }
      | {
          success: false;
          code:
            | 'JSAPI_SERVICE_TERMINATED'
            | 'JSAPI_PARAM_INVALID'
            | 'JSAPI_SYSTEM_ERROR'
            | 'ILLEGAL_NULL_ARGUMENT'
            | 'INVALID_APPLY_CARD_LINK'
            | 'OPEN_FORM_TEMPLATE_NOT_EXIST'
            | 'ALREADY_ACTIVE_CARD'
            | 'OPEN_FORM_FIELD_NOT_PERMITTED'
            | 'OPEN_FORM_USER_LACK_INFO'
            | 'SYSTEM_ERROR';
        }
    >;
    export function authorize(r: {
      /**
       * @summary 需要获取权限类型
       */
      scopes: `${EAuthCodeScope}` | Array<`${EAuthCodeScope}`>;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 授权码
         */
        authCode: string;
        /**
         * @summary 失败的授权类型，key 是授权失败的 scope，value 是对应的错误码
         */
        authErrorScopes: Record<EAuthCodeScope, string>;
        /**
         * @summary 成功的授权 scope
         */
        authSuccessScopes: Array<`${EAuthCodeScope}`>;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 授权码
               */
              authCode: string;
              /**
               * @summary 失败的授权类型，key 是授权失败的 scope，value 是对应的错误码
               */
              authErrorScopes: Record<EAuthCodeScope, string>;
              /**
               * @summary 成功的授权 scope
               */
              authSuccessScopes: Array<`${EAuthCodeScope}`>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 授权码
       */
      authCode: string;
      /**
       * @summary 失败的授权类型，key 是授权失败的 scope，value 是对应的错误码
       */
      authErrorScopes: Record<EAuthCodeScope, string>;
      /**
       * @summary 成功的授权 scope
       */
      authSuccessScopes: Array<`${EAuthCodeScope}`>;
    }>;
    export function canAddAppToMyApps(r: {
      appId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { canAddAppToMyApps: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              canAddAppToMyApps: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      canAddAppToMyApps: boolean;
    }>;
    export function cancelFollowLifestyle(r: {
      publicId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function chooseAddress(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 用户选择的地址 id
         */
        addressId: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 用户选择的地址 id
               */
              addressId: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 用户选择的地址 id
       */
      addressId: string;
    }>;
    export function chooseInvoiceTitle(r: {
      name: string;
      param: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 用户选择的抬头动态码，目前有效期限制1小时，需尽快使用
         */
        dynamicCode: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 用户选择的抬头动态码，目前有效期限制1小时，需尽快使用
               */
              dynamicCode: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 用户选择的抬头动态码，目前有效期限制1小时，需尽快使用
       */
      dynamicCode: string;
    }>;
    export function createSharedBiz(r: {
      validTime: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { sharedBiz: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              sharedBiz: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      sharedBiz: string;
    }>;
    export function getAddress(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 详细地址
         */
        address: string;
        /**
         * @summary 国家名称
         */
        country: string;
        /**
         * @summary 省
         */
        prov: string;
        /**
         * @summary 市
         */
        city: string;
        /**
         * @summary 区
         */
        area: string;
        /**
         * @summary 街道
         */
        street: string;
        /**
         * @summary 名称
         */
        fullname: string;
        /**
         * @summary 手机号
         */
        mobilePhone: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 详细地址
               */
              address: string;
              /**
               * @summary 国家名称
               */
              country: string;
              /**
               * @summary 省
               */
              prov: string;
              /**
               * @summary 市
               */
              city: string;
              /**
               * @summary 区
               */
              area: string;
              /**
               * @summary 街道
               */
              street: string;
              /**
               * @summary 名称
               */
              fullname: string;
              /**
               * @summary 手机号
               */
              mobilePhone: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 详细地址
       */
      address: string;
      /**
       * @summary 国家名称
       */
      country: string;
      /**
       * @summary 省
       */
      prov: string;
      /**
       * @summary 市
       */
      city: string;
      /**
       * @summary 区
       */
      area: string;
      /**
       * @summary 街道
       */
      street: string;
      /**
       * @summary 名称
       */
      fullname: string;
      /**
       * @summary 手机号
       */
      mobilePhone: string;
    }>;
    export function getAuthCode(r: {
      /**
       * @summary 授权类型
       * @default auth_base
       */
      scopes?: `${EAuthCodeScope}` | Array<`${EAuthCodeScope}`>;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 授权码
         */
        authCode: string;
        /**
         * @summary 失败的授权类型，key 是授权失败的 scope，value 是对应的错误码
         */
        authErrorScopes: Record<EAuthCodeScope, string>;
        /**
         * @summary 成功的授权 scope
         */
        authSuccessScopes: Array<`${EAuthCodeScope}`>;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 授权码
               */
              authCode: string;
              /**
               * @summary 失败的授权类型，key 是授权失败的 scope，value 是对应的错误码
               */
              authErrorScopes: Record<EAuthCodeScope, string>;
              /**
               * @summary 成功的授权 scope
               */
              authSuccessScopes: Array<`${EAuthCodeScope}`>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 授权码
       */
      authCode: string;
      /**
       * @summary 失败的授权类型，key 是授权失败的 scope，value 是对应的错误码
       */
      authErrorScopes: Record<EAuthCodeScope, string>;
      /**
       * @summary 成功的授权 scope
       */
      authSuccessScopes: Array<`${EAuthCodeScope}`>;
    }>;
    export function getAuthUserInfo(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 用户昵称。
         */
        nickName: string;
        /**
         * @summary 用户头像链接。
         */
        avatar: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 用户昵称。
               */
              nickName: string;
              /**
               * @summary 用户头像链接。
               */
              avatar: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 用户昵称。
       */
      nickName: string;
      /**
       * @summary 用户头像链接。
       */
      avatar: string;
    }>;
    export function getConfigService(r: {
      configKey: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { configKey: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              configKey: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      configKey: string;
    }>;
    export function getMainSelectedCity(r: {
      needFullName: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        name: string;
        fullName?: string;
        enName?: string;
        code: string;
        chineseMainLand: boolean;
        isManualSelected: boolean;
        settingTime: number;
        districtName?: string;
        districtCode?: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              name: string;
              fullName?: string;
              enName?: string;
              code: string;
              chineseMainLand: boolean;
              isManualSelected: boolean;
              settingTime: number;
              districtName?: string;
              districtCode?: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      name: string;
      fullName?: string;
      enName?: string;
      code: string;
      chineseMainLand: boolean;
      isManualSelected: boolean;
      settingTime: number;
      districtName?: string;
      districtCode?: string;
    }>;
    export function getSetting(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        authSetting: {
          /**
           * @summary 地理位置。
           */
          location?: boolean;
          /**
           * @summary 保存到相册。
           */
          album?: boolean;
          /**
           * @summary 摄像头。
           */
          camera?: boolean;
          /**
           * @summary 唤起授权界面，用户可以授权小程序获取支付宝会员的基础信息。
           */
          userInfo?: boolean;
          /**
           * @summary 运动数据
           */
          alipaysports?: boolean;
          /**
           * @summary 手机号码
           */
          phoneNumber?: boolean;
          /**
           * @summary 收货地址
           */
          aliaddress?: boolean;
        };
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              authSetting: {
                /**
                 * @summary 地理位置。
                 */
                location?: boolean;
                /**
                 * @summary 保存到相册。
                 */
                album?: boolean;
                /**
                 * @summary 摄像头。
                 */
                camera?: boolean;
                /**
                 * @summary 唤起授权界面，用户可以授权小程序获取支付宝会员的基础信息。
                 */
                userInfo?: boolean;
                /**
                 * @summary 运动数据
                 */
                alipaysports?: boolean;
                /**
                 * @summary 手机号码
                 */
                phoneNumber?: boolean;
                /**
                 * @summary 收货地址
                 */
                aliaddress?: boolean;
              };
            }
          | IFailResult,
      ): void;
    }): Promise<{
      authSetting: {
        /**
         * @summary 地理位置。
         */
        location?: boolean;
        /**
         * @summary 保存到相册。
         */
        album?: boolean;
        /**
         * @summary 摄像头。
         */
        camera?: boolean;
        /**
         * @summary 唤起授权界面，用户可以授权小程序获取支付宝会员的基础信息。
         */
        userInfo?: boolean;
        /**
         * @summary 运动数据
         */
        alipaysports?: boolean;
        /**
         * @summary 手机号码
         */
        phoneNumber?: boolean;
        /**
         * @summary 收货地址
         */
        aliaddress?: boolean;
      };
    }>;
    export function getUserInfo(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 用户id，以 "2088" 开头
         */
        userId: string;
        /**
         * @summary 用户的头像图片 URL
         */
        avatar: string;
        /**
         * @summary 用户的脱敏登录账号
         */
        loginId: string;
        /**
         * @summary 用户的脱敏真实姓名
         */
        userName: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 用户id，以 "2088" 开头
               */
              userId: string;
              /**
               * @summary 用户的头像图片 URL
               */
              avatar: string;
              /**
               * @summary 用户的脱敏登录账号
               */
              loginId: string;
              /**
               * @summary 用户的脱敏真实姓名
               */
              userName: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 用户id，以 "2088" 开头
       */
      userId: string;
      /**
       * @summary 用户的头像图片 URL
       */
      avatar: string;
      /**
       * @summary 用户的脱敏登录账号
       */
      loginId: string;
      /**
       * @summary 用户的脱敏真实姓名
       */
      userName: string;
    }>;
    export function iotCheckService(r: {
      serviceId?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { exist: boolean; errorCode: string; errorMessage: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              exist: boolean;
              errorCode: string;
              errorMessage: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      exist: boolean;
      errorCode: string;
      errorMessage: string;
    }>;
    export function iotCreateService(r: {
      serviceId?: string;
      serviceName: string;
      remark?: string;
      urlParams?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { errorCode: string; errorMessage: string; success: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              errorCode: string;
              errorMessage: string;
              success: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      errorCode: string;
      errorMessage: string;
      success: boolean;
    }>;
    export function isAppInMyApps(r: {
      appId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { isAppInMyApps: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              isAppInMyApps: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      isAppInMyApps: boolean;
    }>;
    export function isFollowLifestyle(r: {
      publicId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { followed: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              followed: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      followed: boolean;
    }>;
    export function navigateToAlipayPage(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function navigateToCouponDetail(r: {
      itemId: string;
      chInfo: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { [x: string]: any; [x: number]: any; [x: symbol]: any }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              [x: string]: any;
              [x: number]: any;
              [x: symbol]: any;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      [x: string]: any;
      [x: number]: any;
      [x: symbol]: any;
    }>;
    export function ocr(r: {
      path?: string;
      imageBase64?: string;
      side?: 'face' | 'back';
      ocrType:
        | 'ocr_general'
        | 'ocr_bank_card'
        | 'ocr_vehicle'
        | 'ocr_business_license'
        | 'ocr_train_ticket'
        | 'ocr_driver_license'
        | 'ocr_business_card'
        | 'ocr_passport'
        | 'ocr_vehicle_plate'
        | 'ocr_vin';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { result: unknown; ocrType: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              result: unknown;
              ocrType: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      result: unknown;
      ocrType: string;
    }>;
    export function openCarService(r: {
      /**
       * @summary 服务类型 id。
       * 有效值：
       * - '0' 保养服务
       * - '1' 爱车估值
       * - '2' 加油充值
       */
      serviceId: string;
      /**
       * @summary 地址码，比如 `110100`。
       */
      addressCode?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openCardDetail(r: {
      /**
       * @summary 卡实例 ID。
       */
      passId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openCardList(r: {
      param: Record<string, string>;
      appId: string;
      closeCurrentApp: boolean;
      appClearTop: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openChatWindow(r: {
      userId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openCustomerService(r: {
      /**
       * @summary 租户Id
       */
      tntInstId: string;
      /**
       * @summary 聊天窗编号
       */
      scene: string;
      /**
       * @summary 用户id
       */
      alipayCardNo?: string;
      /**
       * @summary
       */
      extInfo?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openKBVoucherDetail(r: {
      /**
       * @summary 卡实例 ID，调用 [券发放接口](https://docs.open.alipay.com/api_24/alipay.pass.instance.add) 可以获取该参数。
       */
      passId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openKBVoucherDetail(r: {
      /**
       * @summary 商户编号。
       */
      partnerId: string;
      /**
       * @summary 序列号。
       */
      serialNumber: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openMerchantCardList(r: {
      /**
       * @summary 商户编号。
       */
      partnerId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openMerchantTicketList(r: {
      /**
       * @summary 商户编号。
       */
      partnerId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openMerchantVoucherList(r: {
      /**
       * @summary 商户编号。
       */
      partnerId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openOtherApplication(r: {
      url: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openSetting(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openTaobao(r: {
      isLite?: boolean;
      url: string;
      login?: boolean;
      extraQuery?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function openTicketDetail(r: {
      /**
       * @summary 卡实例 ID，调用 [券发放接口](https://docs.open.alipay.com/api_24/alipay.pass.instance.add) 可以获取该参数。
       */
      passId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openTicketDetail(r: {
      /**
       * @summary 商户编号。
       */
      partnerId: string;
      /**
       * @summary 序列号。
       */
      serialNumber: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openTicketList(r: {
      param: Record<string, string>;
      appId: string;
      closeCurrentApp: boolean;
      appClearTop: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openVoucherDetail(r: {
      /**
       * @summary 卡实例 ID，调用 [券发放接口](https://docs.open.alipay.com/api_24/alipay.pass.instance.add) 可以获取该参数。
       */
      passId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openVoucherDetail(r: {
      /**
       * @summary 商户编号。
       */
      partnerId: string;
      /**
       * @summary 序列号。
       */
      serialNumber: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openVoucherList(r: {
      param: Record<string, string>;
      appId: string;
      closeCurrentApp: boolean;
      appClearTop: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function paySignCenter(r: {
      /**
       * @summary 签约字符串。
       */
      signStr: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 处理结果（如需该字段内部参数，切记先 `JSON.parse` 一下）。
         * `JSON.parse` 后的对象结构如下：
         * - `sign`，类型 `string`，签名
         * - `sign_type`，类型 `string`，签名算法类型
         * - `alipay_user_agreement_page_sign_response`，类型 `object`
         */
        result: string;
        /**
         * @summary 签约结果码。
         */
        resultStatus: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 处理结果（如需该字段内部参数，切记先 `JSON.parse` 一下）。
               * `JSON.parse` 后的对象结构如下：
               * - `sign`，类型 `string`，签名
               * - `sign_type`，类型 `string`，签名算法类型
               * - `alipay_user_agreement_page_sign_response`，类型 `object`
               */
              result: string;
              /**
               * @summary 签约结果码。
               */
              resultStatus: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 处理结果（如需该字段内部参数，切记先 `JSON.parse` 一下）。
       * `JSON.parse` 后的对象结构如下：
       * - `sign`，类型 `string`，签名
       * - `sign_type`，类型 `string`，签名算法类型
       * - `alipay_user_agreement_page_sign_response`，类型 `object`
       */
      result: string;
      /**
       * @summary 签约结果码。
       */
      resultStatus: string;
    }>;
    export function reportServiceEvent(r: {
      [x: string]: unknown;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function reportUIError(r: {
      extInfo: Record<string, string>;
      message: string;
      title: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function showFuCard(r: {
      /**
       * @summary 福卡序列化字符串
       * @description base64之后的新pb序列化的字符串，由服务端下发
       */
      fuCard: string;
      /**
       * @summary 来源类型
       * @description 用于区分来源，并且进行埋点统计
       */
      sourceType: string;
      /**
       * @summary 是否关闭收下福卡后的toast
       */
      hideToast: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 福卡 toast 消失类型
         */
        toastViewDismiss: 'timeDismiss' | 'jumpDismiss';
        /**
         * @summary 收取福卡结果
         * - true: 表示点击收下福卡
         * - false: 表示点击关闭弹窗
         */
        received: boolean;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 福卡 toast 消失类型
               */
              toastViewDismiss: 'timeDismiss' | 'jumpDismiss';
              /**
               * @summary 收取福卡结果
               * - true: 表示点击收下福卡
               * - false: 表示点击关闭弹窗
               */
              received: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 福卡 toast 消失类型
       */
      toastViewDismiss: 'timeDismiss' | 'jumpDismiss';
      /**
       * @summary 收取福卡结果
       * - true: 表示点击收下福卡
       * - false: 表示点击关闭弹窗
       */
      received: boolean;
    }>;
    export function startAPVerify(r: {
      /**
       * @summary 通过 `alipay.user.certify.open.initialize` 接口获取的 `url` 认证链接，需要服务端通过开放平台接口获取后，再给前端进行调用。
       */
      url: string;
      /**
       * @summary 通过 `alipay.user.certify.open.certify` 接口获取的 `certifyId`，需要服务端通过开放平台接口获取后，再给前端进行调用。
       */
      certifyId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 认证流程结果状态码
         */
        resultStatus: string;
        /**
         * @summary 本次认证流水号
         */
        certifyId: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 认证流程结果状态码
               */
              resultStatus: string;
              /**
               * @summary 本次认证流水号
               */
              certifyId: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 认证流程结果状态码
       */
      resultStatus: string;
      /**
       * @summary 本次认证流水号
       */
      certifyId: string;
    }>;
    export function startZMCreditRent(r: {
      /**
       * @summary 固定传：`rent`
       */
      creditRentType: string;
      /**
       * @summary 类目（芝麻开发给到），暂时可以用：`ZMSC_2_1`
       */
      category: string;
      /**
       * @summary 商品内容
       */
      subject: {
        products: IProduct[];
      };
      /**
       * @summary 逾期时间，`yyyy-MM-dd HH:mm:ss`，需要大于当前时间
       */
      overdue_time: string;
      /**
       * @summary 该次支付总金额，单位为元，精确到小数点后两位，取值范围 `[0.01,100000000]`
       */
      amount: string;
      /**
       * @summary 外部订单号，即商户自己的订单号
       */
      out_order_no: string;
      /**
       * @summary 入驻信用套餐分配的项目id
       */
      item_id: string;
      /**
       * @summary 订单处理url，商户处理订单的页面，例如订单详情url
       */
      order_process_url: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: any): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: any | IFailResult): void;
    }): Promise<any>;
    export function startZMVerify(r: {
      /**
       * @summary 认证标识
       */
      bizNo: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 认证标识
         */
        token: string;
        /**
         * @summary 认证是否通过
         */
        passed: string;
        /**
         * @summary 认证不通过原因
         */
        reason?: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 认证标识
               */
              token: string;
              /**
               * @summary 认证是否通过
               */
              passed: string;
              /**
               * @summary 认证不通过原因
               */
              reason?: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 认证标识
       */
      token: string;
      /**
       * @summary 认证是否通过
       */
      passed: string;
      /**
       * @summary 认证不通过原因
       */
      reason?: string;
    }>;
    export function textRiskIdentification(r: {
      content: string;
      type: string[];
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        result: {
          /**
           * @summary 目标内容文本识别到的类型。
           */
          type: 'keyword' | '0' | '1' | '2';
          /**
           * @summary 仅当识别命中了 `type` 为 `keyword` 时，才会返回该字段。
           */
          hitKeywords?: string[];
          /**
           * @summary 识别命中得分，最高分为 `100` 分。仅当识别没有命中 `keyword`，但入参中包含了 `广告` 或 `涉政` 或 `涉黄` 时，才会返回该字段。
           */
          score?: string;
        };
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              result: {
                /**
                 * @summary 目标内容文本识别到的类型。
                 */
                type: 'keyword' | '0' | '1' | '2';
                /**
                 * @summary 仅当识别命中了 `type` 为 `keyword` 时，才会返回该字段。
                 */
                hitKeywords?: string[];
                /**
                 * @summary 识别命中得分，最高分为 `100` 分。仅当识别没有命中 `keyword`，但入参中包含了 `广告` 或 `涉政` 或 `涉黄` 时，才会返回该字段。
                 */
                score?: string;
              };
            }
          | IFailResult,
      ): void;
    }): Promise<{
      result: {
        /**
         * @summary 目标内容文本识别到的类型。
         */
        type: 'keyword' | '0' | '1' | '2';
        /**
         * @summary 仅当识别命中了 `type` 为 `keyword` 时，才会返回该字段。
         */
        hitKeywords?: string[];
        /**
         * @summary 识别命中得分，最高分为 `100` 分。仅当识别没有命中 `keyword`，但入参中包含了 `广告` 或 `涉政` 或 `涉黄` 时，才会返回该字段。
         */
        score?: string;
      };
    }>;
    export function tradePay(r: {
      /**
       * @summary 接入小程序支付时传入此参数。此参数为支付宝交易号，注意参数有大小写区分。
       */
      tradeNO: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { resultCode: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              resultCode: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      resultCode: string;
    }>;
    export function tradePay(r: {
      /**
       * @summary 完整的支付参数拼接成的字符串，从服务端获取。
       */
      orderStr: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { resultCode: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              resultCode: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      resultCode: string;
    }>;
    export function updateAlipayClient(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function xnnOcr(r: {
      /**
       * @summary 识别类型。
       */
      type: 'identityCardAvatar' | 'identityCardEmblem' | 'bankcard' | 'plate' | 'vinCode';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        name: string;
        /**
         * @summary 返回结果结构类型。
         */
        type: string;
        /**
         * @summary 结果主体。
         */
        body: Array<Record<string, unknown>>;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              name: string;
              /**
               * @summary 返回结果结构类型。
               */
              type: string;
              /**
               * @summary 结果主体。
               */
              body: Array<Record<string, unknown>>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      name: string;
      /**
       * @summary 返回结果结构类型。
       */
      type: string;
      /**
       * @summary 结果主体。
       */
      body: Array<Record<string, unknown>>;
    }>;
    export function zmCreditBorrow(r: IZmCreditBorrowRequest4OpenZMCreditBorrowPage): Promise<{
      /**
       * @summary 商户发起借用服务时传入的参数，需要在借用结束后返回给商户的参数。
       */
      invoke_state: string;
      /**
       * @summary 外部订单号，需要唯一，由商户传入，芝麻内部会做幂等控制，格式为：yyyyMMddHHmmss+4位随机数
       */
      out_order_no: string;
      /**
       * @summary 芝麻信用借还订单号
       */
      order_no: string;
      /**
       * @summary 是否准入，该字段目前无实际意义。
       * - `Y` 准入
       * - `N` 不准入
       */
      admit_state: 'Y' | 'N';
      /**
       * @summary 物品借用/租赁者的用户id
       */
      user_id: string;
      /**
       * @summary 状态码。
       * - `'6001'` 用户取消了业务流程
       * - `'6002'` 网络异常
       * - `'9000'` 成功
       * - `'4000'` 系统异常
       */
      resultStatus: string;
    }>;
    export function zmCreditBorrow(r: IZmCreditBorrowRequest4OpenZMCreditBorrowMapPage): Promise<{
      /**
       * @summary 商户发起借用服务时传入的参数，需要在借用结束后返回给商户的参数。
       */
      invoke_state: string;
      /**
       * @summary 外部订单号，需要唯一，由商户传入，芝麻内部会做幂等控制，格式为：yyyyMMddHHmmss+4位随机数
       */
      out_order_no: string;
      /**
       * @summary 芝麻信用借还订单号
       */
      order_no: string;
      /**
       * @summary 是否准入，该字段目前无实际意义。
       * - `Y` 准入
       * - `N` 不准入
       */
      admit_state: 'Y' | 'N';
      /**
       * @summary 物品借用/租赁者的用户id
       */
      user_id: string;
      /**
       * @summary 状态码。
       * - `'6001'` 用户取消了业务流程
       * - `'6002'` 网络异常
       * - `'9000'` 成功
       * - `'4000'` 系统异常
       */
      resultStatus: string;
    }>;
    export function zmFreeDeposit(r: {
      /**
       * @summary 后端生成的 openapi 地址。
       */
      url: string;
      /**
       * @summary 当前环境。
       * @default "prod"
       */
      env?: 'prod' | 'stable';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 免押流程是否完成
         */
        success: boolean;
        /**
         * @summary 流程完成时返回的JSON字符串
         */
        biz_content: string;
        /**
         * @summary 流程完成时返回的签名
         */
        sign: string;
        /**
         * @summary 流程完成时返回的额度状态。
         * - `HAS_LIMIT` 有授信额度
         * - `NO_LIMIT` 无授信额度
         */
        status_code: 'HAS_LIMIT' | 'NO_LIMIT';
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 免押流程是否完成
               */
              success: boolean;
              /**
               * @summary 流程完成时返回的JSON字符串
               */
              biz_content: string;
              /**
               * @summary 流程完成时返回的签名
               */
              sign: string;
              /**
               * @summary 流程完成时返回的额度状态。
               * - `HAS_LIMIT` 有授信额度
               * - `NO_LIMIT` 无授信额度
               */
              status_code: 'HAS_LIMIT' | 'NO_LIMIT';
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 免押流程是否完成
       */
      success: boolean;
      /**
       * @summary 流程完成时返回的JSON字符串
       */
      biz_content: string;
      /**
       * @summary 流程完成时返回的签名
       */
      sign: string;
      /**
       * @summary 流程完成时返回的额度状态。
       * - `HAS_LIMIT` 有授信额度
       * - `NO_LIMIT` 无授信额度
       */
      status_code: 'HAS_LIMIT' | 'NO_LIMIT';
    }>;
    export function zmRentTransition(r: {
      /**
       * @summary 固定传：signPay。
       */
      creditRentType: string;
      /**
       * @summary 商户业务标识，透传。
       */
      channel: string;
      /**
       * @summary 该次支付总金额，单位为元，精确到小数点后两位，取值范围 [0.01,100000000]。
       */
      amount: string;
      /**
       * @summary 押金；单位为元，精确到小数点后两位，取值范围 [0.01,100000000]。
       */
      deposit: string;
      /**
       * @summary 芝麻订单号。
       */
      zmOrderNo: string;
      /**
       * @summary 类目（芝麻开发给到），暂时可以用：ZMSC_2_1。
       */
      category: string;
      /**
       * @summary 外部订单号，即商户自己的订单号。
       */
      outOrderNo: string;
      /**
       * @summary 逾期时间，yyyy-MM-dd HH:mm:ss，需要大于当前时间。
       */
      overdue_time: string;
      subject: {
        products: IProduct[];
      };
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { [x: string]: any; [x: number]: any; [x: symbol]: any }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              [x: string]: any;
              [x: number]: any;
              [x: symbol]: any;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      [x: string]: any;
      [x: number]: any;
      [x: symbol]: any;
    }>;
  }
  
  declare namespace my {
    export function createCameraContext(id: string): CameraContext;
    export function createMapContext(id: string): MapContext;
    export function createRDSContext(
      option: void | {
        appId: string;
      },
    ): RDSContext;
    export function createSelectorQuery(
      option: void | {
        /**
         * @summary 是否开启选择器严格模式
         */
        strict?: boolean;
      },
    ): SelectorQuery;
    export function createWebViewContext(id: string): WebViewContext;
    export function createWorker(scriptPath: string): Worker;
    export function createXnnGraphQuery(query: {
      /**
       * @summary 图描述的json 字符串
       */
      graph: string;
      /**
       * @summary 扩展字段
       */
      options: object;
    }): XnnGraphTransaction;
    export function getFileSystemManager(): FileSystemManager;
    export function getNFCAdapter(): NFCAdapter;
    export function getUpdateManager(): UpdateManager;
    /**
     * @summary 添加日历事件
     */
    export function addEventCal(r: {
      title: string;
      startDate: string;
      endDate: string;
      recurrenceTimes?: number;
      frequency?: void | 'day' | 'year' | 'month' | 'week';
      location?: string;
      notes?: string;
      alarmOffset?: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 添加日历事件
     */
    export function addEventCalendar(r: {
      title: string;
      startDate?: string;
      endDate?: string;
      recurrenceTimes?: number;
      frequency?: string;
      location?: string;
      notes?: string;
      alarmOffset?: number;
      startTime?: number;
      endTime?: number;
      allDay?: boolean;
      description?: string;
      repeatInterval?: string;
      repeatEndTime?: number;
      alarm?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function addPeripheralService(r: {
      serviceId: string;
      characteristics: ICharacteristicRequest[];
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 用户可以选择将表单以“创建新联系人”或“添加到现有联系人”的方式，写入联系人资料到手机系统的通讯录
     */
    export function addPhoneContact(r: {
      remark?: string;
      url?: string;
      title?: string;
      lastName?: string;
      middleName?: string;
      firstName?: string;
      nickName?: string;
      mobilePhoneNumber?: string;
      workFaxNumber?: string;
      workPhoneNumber?: string;
      hostNumber?: string;
      homeFaxNumber?: string;
      homePhoneNumber?: string;
      weChatNumber?: string;
      alipayAccount?: string;
      organization?: string;
      email?: string;
      addressCountry?: string;
      addressState?: string;
      addressCity?: string;
      addressStreet?: string;
      addressPostalCode?: string;
      workCountry?: string;
      workState?: string;
      workCity?: string;
      workStreet?: string;
      workPostalCode?: string;
      homeCountry?: string;
      homeState?: string;
      homeCity?: string;
      homeStreet?: string;
      homePostalCode?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function addTabBarItem(r: {
      /**
       * @summary tab 标题
       */
      name: string;
      /**
       * @summary 图标
       */
      icon?: string;
      /**
       * @summary 选中时的图标
       */
      activeIcon?: string;
      /**
       * @summary tabItem 对应的页面路径，需要配置在小程序配置文件中
       */
      pagePath: string;
      /**
       * @summary item 插入位置，原位置的页面将后移一个位置，从 `0` 开始
       */
      index: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 将当前小程序添加到收藏。
     */
    export function addToFavorite(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function agreementConfirm(r: {
      title: string;
      message: string;
      agreements: string[];
      align: 'right' | 'left' | 'center';
      okButton?: string;
      cancelButton?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 警告框
     * @description 可以设置警告框的标题、内容、按钮文字等
     */
    export function alert(r: {
      /**
       * @summary 警告框的标题
       */
      title?: string;
      /**
       * @summary 警告框的内容
       */
      content?: string;
      /**
       * @summary 按钮文字
       * @default "确定"
       */
      buttonText?: string;
      /**
       * @summary "确认" 按钮颜色，HEX 格式
       */
      confirmColor?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary Alipay+ 国际小程序唤起支付收银台
     */
    export function crossPay(r: {
      paymentUrl?: string;
      tradeNO?: string;
      orderStr?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { resultCode: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              resultCode: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      resultCode: number;
    }>;
    /**
     * @summary Alipay+ 国际小程序获取当前站点名称
     */
    export function getSiteInfo(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { siteName: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              siteName: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      siteName: string;
    }>;
    /**
     * @summary Alipay+ 国际小程序在主站签约代扣
     */
    export function signContract(r: {
      signStr: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 追加渠道透传信息。
     * @deprecated 经查阅，客户端不存在这个 actionType
     */
    export function appendChinfoChain(r: {
      chinfo: string;
      scm: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 将 `ArrayBuffer` 对象转成 `Base64` 字符串。
     */
    export function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string;
    /**
     * @summary 将 `Base64` 字符串转成 `ArrayBuffer` 对象。
     */
    export function base64ToArrayBuffer(base64: string): ArrayBuffer;
    export function getBLEDeviceStatus(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { authStatus: number; powerStatus: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              authStatus: number;
              powerStatus: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      authStatus: number;
      powerStatus: number;
    }>;
    export function showBLEPermissionGuide(r: {
      /**
       * @summary 蓝牙首次使用，业务提示弹窗标题（仅iOS，不配置则不会弹窗）
       */
      firstTipTitle?: string;
      /**
       * @summary 蓝牙首次使用，业务提示弹窗内容（仅iOS，不配置则不会弹窗）
       */
      firstTipsMessage?: string;
      /**
       * @summary 授权蓝牙，业务提示弹窗标题（仅iOS，不配置则不会弹窗）
       */
      authTipsTitle?: string;
      /**
       * @summary 授权蓝牙，业务提示弹窗内容（仅iOS，不配置则不会弹窗）
       */
      authTipsMessage?: string;
      /**
       * @summary 授权蓝牙，业务提示弹窗按钮标题（仅iOS，不配置则不会弹窗）
       */
      authTipsButton?: string;
      /**
       * @summary 开启蓝牙，业务提示弹窗标题
       */
      openTipsTitle?: string;
      /**
       * @summary 开启蓝牙，业务提示弹窗内容
       */
      openTipsMessage?: string;
      /**
       * @summary 开启蓝牙，业务提示弹窗按钮标题
       */
      openTipsButton?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: boolean;
    }>;
    /**
     * @summary 根据起点和终点的地理位置，智能规划最佳出行路线，并计算不同出行方式下的行动距离和所需时间。默认规划步行路线，支持规划步行、公交、骑行和驾车四种路线
     */
    export function calculateRoute(r: {
      searchType?: 'walk' | 'bus' | 'drive' | 'ride';
      startLat: number;
      startLng: number;
      endLat: number;
      endLng: number;
      throughPoints?: IThroughPoint[];
      mode?: ECalculateRouteMode;
      city?: string;
      destinationCity?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success?: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success?: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success?: boolean;
    }>;
    /**
     * @summary 查询当前小程序是否可以收藏。
     */
    export function canFavorite(r: {
      appId?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { canFavorite: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              canFavorite: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      canFavorite: boolean;
    }>;
    export function cancelBluetoothPair(r: {
      deviceId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function cancelRecord(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function canvasToTempFilePath(r: {
      canvasId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { filePath: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              filePath: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      filePath: string;
    }>;
    /**
     * @summary 唤起支付宝通讯录，选择一个或者多个支付宝联系人
     */
    export function chooseAlipayContact(r: {
      /**
       * @summary 单次最多选择联系人个数
       * @description 默认值为 1，最大值为 10。
       * @default 1
       */
      count?: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 选中的支付宝联系人数组。
         */
        contacts: IContacts4ChooseAlipayContact[];
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 选中的支付宝联系人数组。
               */
              contacts: IContacts4ChooseAlipayContact[];
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 选中的支付宝联系人数组。
       */
      contacts: IContacts4ChooseAlipayContact[];
    }>;
    /**
     * @summary 打开城市选择列表。
     */
    export function chooseCity(r: {
      /**
       * @summary 是否显示当前定位城市。
       * @default false
       */
      showLocatedCity?: boolean;
      /**
       * @summary 是否显示热门城市。
       * @default true
       */
      showHotCities?: boolean;
      /**
       * @summary 是否修改当前定位城市，如果 showLocatedCity 为 false，此设置无效。
       * @default false
       */
      setLocatedCity?: boolean;
      /**
       * @summary 自定义城市列表。
       */
      cities?: ICity[];
      /**
       * @summary 自定义热门城市列表。
       */
      hotCities?: ICity[];
      /**
       * @summary 自定义历史访问城市列表。
       */
      customHistoryCities?: ICity[];
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 城市名。
         */
        city: string;
        /**
         * @summary 行政区划代码。
         */
        adCode: string;
        /**
         * @summary 经度（注意：仅用户选择当前定位城市才会返回）。
         */
        longitude?: number;
        /**
         * @summary 纬度（注意：仅用户选择当前定位城市才会返回）。
         */
        latitude?: number;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 城市名。
               */
              city: string;
              /**
               * @summary 行政区划代码。
               */
              adCode: string;
              /**
               * @summary 经度（注意：仅用户选择当前定位城市才会返回）。
               */
              longitude?: number;
              /**
               * @summary 纬度（注意：仅用户选择当前定位城市才会返回）。
               */
              latitude?: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 城市名。
       */
      city: string;
      /**
       * @summary 行政区划代码。
       */
      adCode: string;
      /**
       * @summary 经度（注意：仅用户选择当前定位城市才会返回）。
       */
      longitude?: number;
      /**
       * @summary 纬度（注意：仅用户选择当前定位城市才会返回）。
       */
      latitude?: number;
    }>;
    /**
     * @summary 唤起选择人，默认只包含支付宝联系人，可通过修改参数选择手机通讯录联系人或者双向通讯录联系人。
     */
    export function chooseContact(r: {
      /**
       * @summary 选择类型。
       */
      chooseType: 'single' | 'multi';
      includeMe?: boolean;
      /**
       * @summary 选择手机通讯录联系人的模式。
       */
      includeMobileContactMode?: 'none' | 'known' | 'all';
      /**
       * @summary 是否包含自己。
       */
      chooseContact?: boolean;
      /**
       * @summary 最大选择人数
       * @description 仅 `chooseType` 为 `multi` 时才有效。
       */
      multiChooseMax?: number;
      /**
       * @summary 多选达到上限时提示的文案
       * @description 仅 `chooseType` 为 `multi` 时才有效。
       */
      multiChooseMaxTips?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 选择返回的用户信息。
         */
        contactsDicArray: IContactsDic4ChooseContact[];
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 选择返回的用户信息。
               */
              contactsDicArray: IContactsDic4ChooseContact[];
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 选择返回的用户信息。
       */
      contactsDicArray: IContactsDic4ChooseContact[];
    }>;
    export function chooseDistrict(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { name: string; adCode: string; ext?: Record<string, string> }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              name: string;
              adCode: string;
              ext?: Record<string, string>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      name: string;
      adCode: string;
      ext?: Record<string, string>;
    }>;
    export function chooseFileFromDisk(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true; apFilePath: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
              apFilePath: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
      apFilePath: string;
    }>;
    /**
     * @summary 拍照或从本地相册中选择图片。
     */
    export function chooseImage(r: {
      /**
       * @summary 最大可选照片数，默认为 1 张
       * @default 1
       */
      count?: number;
      /**
       * @summary 图片类型。
       * @default ["original","compressed"]
       */
      sizeType?: Array<`${EImageChoosenSizeType}`> | `${EImageChoosenSizeType}`;
      /**
       * @summary 图片类型。
       * @default ["camera","album"]
       */
      sourceType?: Array<`${EImageChoosenSourceType}`> | `${EImageChoosenSourceType}`;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { apFilePaths: string[]; tempFilePaths: string[] }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              apFilePaths: string[];
              tempFilePaths: string[];
            }
          | IFailResult,
      ): void;
    }): Promise<{
      apFilePaths: string[];
      tempFilePaths: string[];
    }>;
    /**
     * @summary 使用支付宝内置地图选择地理位置。
     */
    export function chooseLocation(r: {
      title?: string;
      showTab?: boolean;
      sendBtnText?: string;
      latitude?: number;
      longitude?: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 位置名称。
         */
        name: string;
        /**
         * @summary 地址的详细说明。
         */
        address: string;
        /**
         * @summary 经度。
         */
        longitude: string;
        /**
         * @summary 纬度。
         */
        latitude: string;
        /**
         * @summary 省份名称。
         */
        provinceName: string;
        /**
         * @summary 城市名称。
         */
        cityName: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 位置名称。
               */
              name: string;
              /**
               * @summary 地址的详细说明。
               */
              address: string;
              /**
               * @summary 经度。
               */
              longitude: string;
              /**
               * @summary 纬度。
               */
              latitude: string;
              /**
               * @summary 省份名称。
               */
              provinceName: string;
              /**
               * @summary 城市名称。
               */
              cityName: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 位置名称。
       */
      name: string;
      /**
       * @summary 地址的详细说明。
       */
      address: string;
      /**
       * @summary 经度。
       */
      longitude: string;
      /**
       * @summary 纬度。
       */
      latitude: string;
      /**
       * @summary 省份名称。
       */
      provinceName: string;
      /**
       * @summary 城市名称。
       */
      cityName: string;
    }>;
    /**
     * @summary 选择本地系统通信录中某个联系人的电话。
     */
    export function choosePhoneContact(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { name: string; mobile: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              name: string;
              mobile: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      name: string;
      mobile: string;
    }>;
    export function chooseVideo(r: {
      /**
       * @summary 视频选择的来源。
       * @default ['album','camera']
       */
      sourceType?: Array<`${ESourceType}`> | `${ESourceType}`;
      /**
       * @summary 是否压缩所选择的视频文件。对iOS总是有压缩的，只是压缩级别不同。
       * @default true
       */
      compressed?: boolean;
      /**
       * @summary 拍摄视频最长拍摄时间，单位：秒。
       * @default 60
       */
      maxDuration?: number;
      /**
       * @summary 默认拉起的是前置或者后置摄像头。部分 Android 手机下由于系统 ROM 不支持无法生效。
       * @default back
       */
      camera?: Array<`${ECamera}`> | `${ECamera}`;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 选定视频的临时文件路径。
         */
        filePath: string;
        /**
         * @summary 选定视频的时间长度。
         */
        duration: number;
        /**
         * @summary 选定视频的数据量大小。
         */
        size: number;
        /**
         * @summary 返回选定视频的高度。
         */
        height: number;
        /**
         * @summary 返回选定视频的宽度。
         */
        width: number;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 选定视频的临时文件路径。
               */
              filePath: string;
              /**
               * @summary 选定视频的时间长度。
               */
              duration: number;
              /**
               * @summary 选定视频的数据量大小。
               */
              size: number;
              /**
               * @summary 返回选定视频的高度。
               */
              height: number;
              /**
               * @summary 返回选定视频的宽度。
               */
              width: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 选定视频的临时文件路径。
       */
      filePath: string;
      /**
       * @summary 选定视频的时间长度。
       */
      duration: number;
      /**
       * @summary 选定视频的数据量大小。
       */
      size: number;
      /**
       * @summary 返回选定视频的高度。
       */
      height: number;
      /**
       * @summary 返回选定视频的宽度。
       */
      width: number;
    }>;
    /**
     * @summary 清除本地数据缓存的异步接口
     */
    export function clearStorage(r: {
      type: 'user';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { error: 0; success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              error: 0;
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      error: 0;
      success: true;
    }>;
    /**
     * @summary 清除本地数据缓存的同步接口。
     */
    export function clearStorageSync(r: { type: 'user' }): {
      error: 0;
      success: true;
    };
    export function closeBLEPeripheral(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 关闭本机蓝牙模块。
     */
    export function closeBluetoothAdapter(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 关闭 WebSocket 连接。
     */
    export function closeSocket(r: {
      code?: number;
      socketTaskID?: string;
      reason?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { message: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              message: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      message: string;
    }>;
    /**
     * @summary 压缩图片。
     */
    export function compressImage(r: {
      /**
       * @summary 要压缩的图片路径数组。
       */
      apFilePaths: string[];
      /**
       * @summary 压缩级别。
       * 有效值：
       * - `0` 低质量
       * - `1` 中等质量
       * - `2` 高质量
       * - `3` 不压缩
       * - `4` 根据网络适应
       * @default 4
       */
      compressLevel?: ECompressImageCompressLevel;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { apFilePaths: string[] }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              apFilePaths: string[];
            }
          | IFailResult,
      ): void;
    }): Promise<{
      apFilePaths: string[];
    }>;
    /**
     * @summary 用于提示的确认框
     * @description 可以配置确认框的标题、内容、确认或取消按钮的文字等
     */
    export function confirm(r: {
      /**
       * @summary 确认框的标题
       */
      title?: string;
      /**
       * @summary 确认框的内容
       */
      content?: string;
      /**
       * @summary 确认按钮文字
       * @default "确定"
       */
      confirmButtonText?: string;
      /**
       * @summary 取消按钮文字
       * @default "取消"
       */
      cancelButtonText?: string;
      /**
       * @summary "确认" 按钮颜色，HEX 格式
       */
      confirmColor?: string;
      /**
       * @summary "取消" 按钮颜色，HEX 格式
       */
      cancelColor?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary  "确认" 为 true, 否则为 false
         */
        confirm: boolean;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary  "确认" 为 true, 否则为 false
               */
              confirm: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary  "确认" 为 true, 否则为 false
       */
      confirm: boolean;
    }>;
    /**
     * @summary 连接低功耗蓝牙设备。
     */
    export function connectBLEDevice(r: {
      deviceId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 创建一个 WebSocket 的连接
     */
    export function connectSocket(option: {
      multiple?: boolean;
      /**
       * @summary 目标服务器接口地址。
       * - 部分新发布的小程序只支持 wss 协议。
       */
      url: string;
      /**
       * @summary 请求的参数。
       */
      data?: Record<string, unknown>;
      /**
       * @summary 设置请求的头部。
       */
      header?: Record<string, string>;
    }): void;
    export function connectWifi(r: {
      SSID?: string;
      BSSID?: string;
      maunal?: boolean;
      isWEP?: boolean;
      password?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function createAnimation(config: {
      /**
       * @summary 动画持续时间，单位 ms
       * @default 400
       */
      duration?: number;
      /**
       * @summary 动画的效果
       * @default "linear"
       */
      timeFunction?: string;
      /**
       * @summary 动画延迟时间，单位 ms
       */
      delay?: number;
      /**
       * @summary 动画变形的原点
       * @default "50% 50% 0"
       */
      transformOrigin?: string;
    }): Animation;
    /**
     * @summary 打开日期选择列表。
     */
    export function datePicker(r: {
      /**
       * @summary 返回的日期格式。
       * 有效值：
       * - `HH:mm`
       * - `yyyy-MM-dd HH:mm`
       * - `yyyy-MM`（可通过 canIUse('datePicker.object.format.yyyy-MM') 判断）。
       * - `yyyy`（可通过 canIUse('datePicker.object.format.yyyy') 判断）。
       * @default "yyyy-MM-dd"
       */
      format: 'yyyy-MM-dd' | 'HH:mm' | 'yyyy-MM' | 'yyyy' | 'HH:mm:ss' | 'yyyy-MM-dd HH:mm:ss' | 'yyyy-MM-dd HH:mm';
      /**
       * @summary 初始选择的日期时间。
       * @default 默认当前时间
       */
      currentDate?: string;
      /**
       * @summary 最小日期时间。
       */
      startDate?: string;
      /**
       * @summary 最大日期时间。
       */
      endDate?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { date: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              date: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      date: string;
    }>;
    /**
     * @summary 断开与低功耗蓝牙设备的连接。
     */
    export function disconnectBLEDevice(r: {
      deviceId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function donateInBrowser(r: {
      url: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 下载文件资源到本地的 API。
     * @description
     * - 可下载任何格式的文件，不能被识别的文件将以 other 的方式存储起来
     */
    export function downloadFile(r: {
      /**
       * @summary 下载文件地址
       */
      url: string;
      /**
       * @summary HTTP 请求 Header
       */
      header?: Record<string, string>;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 文件临时存放的位置。
         */
        apFilePath: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 文件临时存放的位置。
               */
              apFilePath: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 文件临时存放的位置。
       */
      apFilePath: string;
    }>;
    export function enableSnapshot(r: {
      /**
       * @summary 数据等到超时时间，超时后立即更新页面，单位：毫秒
       */
      timeout: number;
      disableDynamicPluginCheck?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 退出当前小程序
     */
    export function exit(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function generateImageFromCode(r: {
      code: string;
      format: 'QRCODE';
      width: number;
      correctLevel: 'L' | 'M' | 'Q' | 'H';
      orientation: 'right' | 'left' | 'up' | 'down' | 'up-mirrored' | 'down-mirrored' | 'left-mirrored' | 'right-mirrored';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { image: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              image: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      image: string;
    }>;
    /**
     * @summary 通过地址信息，获取经纬度信息。
     */
    export function geoCode(r: {
      bizType: string;
      address: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { latitude: number; longitude: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              latitude: number;
              longitude: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      latitude: number;
      longitude: number;
    }>;
    /**
     * @summary 用于同步获取小程序 AppId
     */
    export function getAppIdSync(): {
      /**
       * @summary 当前小程序的 AppId
       */
      appId: string;
    };
    /**
     * @summary 获取权限状态，用于判断【自启】，【后台运行】，【定位】以及【通知栏开关】的权限状态。
     */
    export function getAuthStatus(r: {
      bizType: string;
      authType: `${EAuthType}`;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { authStatus: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              authStatus: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      authStatus: string;
    }>;
    /**
     * @summary 获取支持的音频输入源。
     */
    export function getAvailableAudioSources(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { audioSources: ('auto' | 'buildInMic' | 'headsetMic' | 'mic' | 'camcorder')[] }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              audioSources: ('auto' | 'buildInMic' | 'headsetMic' | 'mic' | 'camcorder')[];
            }
          | IFailResult,
      ): void;
    }): Promise<{
      audioSources: ('auto' | 'buildInMic' | 'headsetMic' | 'mic' | 'camcorder')[];
    }>;
    /**
     * @summary 获取蓝牙设备所有 characteristic（特征值）。
     */
    export function getBLEDeviceCharacteristics(r: {
      serviceId: string;
      deviceId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { characteristics: IBLECharacteristic[] }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              characteristics: IBLECharacteristic[];
            }
          | IFailResult,
      ): void;
    }): Promise<{
      characteristics: IBLECharacteristic[];
    }>;
    export function getBLEDeviceRSSI(r: {
      deviceId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { RSSI: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              RSSI: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      RSSI: number;
    }>;
    /**
     * @summary 获取蓝牙设备所有 service（服务）
     */
    export function getBLEDeviceServices(r: {
      deviceId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { services: IBLEService[] }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              services: IBLEService[];
            }
          | IFailResult,
      ): void;
    }): Promise<{
      services: IBLEService[];
    }>;
    export function getBLEMTU(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { mtu: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              mtu: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      mtu: number;
    }>;
    export function getBackgroundAudioPlayerState(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 音乐播放状态。
         * - `0` 暂停中。
         * - `1` 播放中。
         * - `2` 没有音乐在播放。
         */
        status: number;
        /**
         * @summary 音乐总时长，单位秒。
         */
        duration: number;
        /**
         * @summary 当前播放位置，单位秒。
         */
        currentPosition: number;
        /**
         * @summary 缓冲百分比。
         */
        downloadPercent: number;
        url: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 音乐播放状态。
               * - `0` 暂停中。
               * - `1` 播放中。
               * - `2` 没有音乐在播放。
               */
              status: number;
              /**
               * @summary 音乐总时长，单位秒。
               */
              duration: number;
              /**
               * @summary 当前播放位置，单位秒。
               */
              currentPosition: number;
              /**
               * @summary 缓冲百分比。
               */
              downloadPercent: number;
              url: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 音乐播放状态。
       * - `0` 暂停中。
       * - `1` 播放中。
       * - `2` 没有音乐在播放。
       */
      status: number;
      /**
       * @summary 音乐总时长，单位秒。
       */
      duration: number;
      /**
       * @summary 当前播放位置，单位秒。
       */
      currentPosition: number;
      /**
       * @summary 缓冲百分比。
       */
      downloadPercent: number;
      url: string;
    }>;
    /**
     * @description 拉取 backgroundFetchData 客户端缓存数据
     */
    export function getBackgroundFetchData(r: {
      /**
       * @description 请求类型
       * @default "pre"
       */
      fetchType: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @description 请求类型
         * @default "pre"
         */
        fetchType: string;
        /**
         * @description 客户端拿到缓存数据的时间戳
         */
        timestamp: number;
        /**
         * @description 当前预加载的response数据，
         */
        fetchedData: Record<string, unknown>;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @description 请求类型
               * @default "pre"
               */
              fetchType: string;
              /**
               * @description 客户端拿到缓存数据的时间戳
               */
              timestamp: number;
              /**
               * @description 当前预加载的response数据，
               */
              fetchedData: Record<string, unknown>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @description 请求类型
       * @default "pre"
       */
      fetchType: string;
      /**
       * @description 客户端拿到缓存数据的时间戳
       */
      timestamp: number;
      /**
       * @description 当前预加载的response数据，
       */
      fetchedData: Record<string, unknown>;
    }>;
    /**
     * @summary 获取电量的异步接口。异步获取当前设备的电量和充电状态。
     */
    export function getBatteryInfo(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { level: number; isCharging: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              level: number;
              isCharging: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      level: number;
      isCharging: boolean;
    }>;
    /**
     * @summary 获取电量的同步接口。同步获取当前设备的电量和充电状态。
     */
    export function getBatteryInfoSync(): {
      level: number;
      isCharging: boolean;
    };
    /**
     * @summary 获取已经搜索到的iBeacon设备
     */
    export function getBeacons(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { beacons: IBeacon[] }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              beacons: IBeacon[];
            }
          | IFailResult,
      ): void;
    }): Promise<{
      beacons: IBeacon[];
    }>;
    /**
     * @summary 获取本机蓝牙模块状态。
     */
    export function getBluetoothAdapterState(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 获取所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备。
     */
    export function getBluetoothDevices(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { devices: IBluetoothDevice[] }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              devices: IBluetoothDevice[];
            }
          | IFailResult,
      ): void;
    }): Promise<{
      devices: IBluetoothDevice[];
    }>;
    export function getBluetoothPairs(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { devices: IBluetoothDevice[] }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              devices: IBluetoothDevice[];
            }
          | IFailResult,
      ): void;
    }): Promise<{
      devices: IBluetoothDevice[];
    }>;
    export function getCarrierName(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { carrierName: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              carrierName: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      carrierName: string;
    }>;
    /**
     * @summary 获取渠道透传信息。
     */
    export function getChinfoChain(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: string[]): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: string[] | IFailResult): void;
    }): Promise<string[]>;
    /**
     * @summary 获取剪贴板数据。
     */
    export function getClipboard(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { text: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              text: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      text: string;
    }>;
    /**
     * @summary 获取处于已连接状态的设备。
     */
    export function getConnectedBluetoothDevices(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { devices: IBluetoothDevice[] }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              devices: IBluetoothDevice[];
            }
          | IFailResult,
      ): void;
    }): Promise<{
      devices: IBluetoothDevice[];
    }>;
    export function getConnectedWifi(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        success: true;
        wifi: {
          SSID: string;
          SSIBSSIDD: string;
          secure: boolean;
          signalStrength: number;
        };
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
              wifi: {
                SSID: string;
                SSIBSSIDD: string;
                secure: boolean;
                signalStrength: number;
              };
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
      wifi: {
        SSID: string;
        SSIBSSIDD: string;
        secure: boolean;
        signalStrength: number;
      };
    }>;
    /**
     * @summary 此接口可获取支付宝会员的基础信息（头像图片地址、昵称、性别、国家码、省份、所在市区）
     */
    export function getCustomOpenUserInfo(r: {
      /**
       * @summary scope
       * @description  预先定义的scope有以下6种，后期可能再继续增加
       * - "share_userinfo" 可获取 头像、昵称、行吧、省、市、区
       * - "share_phonenumber" 可获取 手机号
       * - "share_idnumber" 可获取 姓名、证件类型、证件号、是否实名
       * - "share_idphone" 可获取 手机号、姓名、证件类型、证件号、是否实名
       * - "share_membergrage" 可获取 会员等级
       * - "share_userinfo_ext" 可获取 头像、昵称、行吧、省、市、区、手机号、姓名、证件类型、证件号、是否实名
       */
      scope: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 头像图片地址
         */
        avatar?: string;
        /**
         * @summary 所在市区
         */
        city?: string;
        code?: number;
        /**
         * @summary 国家码
         */
        countryCode?: number;
        /**
         * @summary 性别
         * - "m" 对应男
         * - "f" 对应女
         */
        gender?: string;
        /**
         * @summary 昵称
         */
        nickName?: string;
        /**
         * @summary 省份
         */
        province?: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 头像图片地址
               */
              avatar?: string;
              /**
               * @summary 所在市区
               */
              city?: string;
              code?: number;
              /**
               * @summary 国家码
               */
              countryCode?: number;
              /**
               * @summary 性别
               * - "m" 对应男
               * - "f" 对应女
               */
              gender?: string;
              /**
               * @summary 昵称
               */
              nickName?: string;
              /**
               * @summary 省份
               */
              province?: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 头像图片地址
       */
      avatar?: string;
      /**
       * @summary 所在市区
       */
      city?: string;
      code?: number;
      /**
       * @summary 国家码
       */
      countryCode?: number;
      /**
       * @summary 性别
       * - "m" 对应男
       * - "f" 对应女
       */
      gender?: string;
      /**
       * @summary 昵称
       */
      nickName?: string;
      /**
       * @summary 省份
       */
      province?: string;
    }>;
    export function getDeviceID(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { data: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              data: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      data: string;
    }>;
    export function getDeviceInfo(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        data: {
          imei: string;
          mac: string;
          androidId: string;
          sn: string;
          utdid: string;
        };
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              data: {
                imei: string;
                mac: string;
                androidId: string;
                sn: string;
                utdid: string;
              };
            }
          | IFailResult,
      ): void;
    }): Promise<{
      data: {
        imei: string;
        mac: string;
        androidId: string;
        sn: string;
        utdid: string;
      };
    }>;
    /**
     * @summary 可获得小程序本次唤起的参数。
     * @summary 如果当前是冷启动，则返回值与 App.onLaunch 的回调参数一致；如果当前是热启动，则返回值与 App.onShow 一致。
     */
    export function getEnterOptionsSync(): ILaunchOptions;
    /**
     * @summary 获取 [模板小程序](https://opendocs.alipay.com/mini/isv/creatminiapp#%E5%8F%82%E6%95%B0%E8%AF%B4%E6%98%8E) 自定义数据字段的异步接口。
     */
    export function getExtConfig(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 配置在模版小程序 `ext.json` 中的 `ext` 配置字段的值。
         */
        data: Record<string, unknown>;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 配置在模版小程序 `ext.json` 中的 `ext` 配置字段的值。
               */
              data: Record<string, unknown>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 配置在模版小程序 `ext.json` 中的 `ext` 配置字段的值。
       */
      data: Record<string, unknown>;
    }>;
    /**
     * @summary 获取 [模板小程序] 配置在模版小程序 `ext.json` 中的 `ext` 配置字段的值。
     */
    export function getExtConfigSync(): Record<string, unknown>;
    /**
     * @summary 获取文件信息。
     */
    export function getFileInfo(r: {
      sharedBiz?: string;
      apFilePath?: string;
      filePath?: string;
      digestAlgorithm: 'md5' | 'sha1';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { size: number; digest: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              size: number;
              digest: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      size: number;
      digest: string;
    }>;
    export function getHCEState(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { errMsg: number; errCode: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              errMsg: number;
              errCode: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      errMsg: number;
      errCode: number;
    }>;
    export function getIDNumber(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 加密的数据，前端需要将该报文发送到开发者服务端做验签和解密处理（详细的服务端处理流程参考[敏感信息加解密方法](https://docs.alipay.com/mini/introduce/aes)）。
         * 解密后的字段如下：
         * - `userName`，类型 `string`，用户姓名，注意：只有is_certified为T的时候才有意义，否则不保证准确性。
         * - `certNo`，类型 `string`，证件号码，注意：只有is_certified为T的时候才有意义，否则不保证准确性。
         * - `certType`，类型 `string`，证件类型，注意：只有is_certified为T的时候才有意义，否则不保证准确性.。
         *     取值枚举： 0:身份证 1:护照 2:军官证 3:士兵证 4:回乡证 5:临时身份证 6:户口簿 7:警官证 8:台胞证 9:营业执照 10:其它证件 11:港澳居民来往内地通行证 12:台湾居民来往大陆通行证
         * - `isCertified`，类型 `string`，是否通过实名认证，T:是；F:否。
         */
        response: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 加密的数据，前端需要将该报文发送到开发者服务端做验签和解密处理（详细的服务端处理流程参考[敏感信息加解密方法](https://docs.alipay.com/mini/introduce/aes)）。
               * 解密后的字段如下：
               * - `userName`，类型 `string`，用户姓名，注意：只有is_certified为T的时候才有意义，否则不保证准确性。
               * - `certNo`，类型 `string`，证件号码，注意：只有is_certified为T的时候才有意义，否则不保证准确性。
               * - `certType`，类型 `string`，证件类型，注意：只有is_certified为T的时候才有意义，否则不保证准确性.。
               *     取值枚举： 0:身份证 1:护照 2:军官证 3:士兵证 4:回乡证 5:临时身份证 6:户口簿 7:警官证 8:台胞证 9:营业执照 10:其它证件 11:港澳居民来往内地通行证 12:台湾居民来往大陆通行证
               * - `isCertified`，类型 `string`，是否通过实名认证，T:是；F:否。
               */
              response: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 加密的数据，前端需要将该报文发送到开发者服务端做验签和解密处理（详细的服务端处理流程参考[敏感信息加解密方法](https://docs.alipay.com/mini/introduce/aes)）。
       * 解密后的字段如下：
       * - `userName`，类型 `string`，用户姓名，注意：只有is_certified为T的时候才有意义，否则不保证准确性。
       * - `certNo`，类型 `string`，证件号码，注意：只有is_certified为T的时候才有意义，否则不保证准确性。
       * - `certType`，类型 `string`，证件类型，注意：只有is_certified为T的时候才有意义，否则不保证准确性.。
       *     取值枚举： 0:身份证 1:护照 2:军官证 3:士兵证 4:回乡证 5:临时身份证 6:户口簿 7:警官证 8:台胞证 9:营业执照 10:其它证件 11:港澳居民来往内地通行证 12:台湾居民来往大陆通行证
       * - `isCertified`，类型 `string`，是否通过实名认证，T:是；F:否。
       */
      response: string;
    }>;
    /**
     * @summary 获取图片信息。
     */
    export function getImageInfo(r: {
      src: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { path: string; width: number; size?: number; height: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              path: string;
              width: number;
              size?: number;
              height: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      path: string;
      width: number;
      size?: number;
      height: number;
    }>;
    /**
     * @summary 获取小程序启动时的参数, 与 `App.onLaunch` 的回调参数一致
     */
    export function getLaunchOptionsSync(): ILaunchOptions;
    /**
     * @summary 获取用户当前的地理位置信息。
     * @description
     * - 仅支持高德地图 style 与火星坐标系
     * - 暂无境外地图数据，在中国内地（不含港澳台）以外的地区可能无法正常调用此 API
     */
    export function getLocation(r: {
      /**
       * @summary 支付宝客户端经纬度定位缓存过期时间，单位为秒
       * @description 使用缓存会加快定位速度，缓存过期会重新定位
       * @default 30
       */
      cacheTimeout?: number;
      /**
       * @summary 获取经纬度数据的类型。
       * @default 0
       */
      type?: EGetLocationType;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 经度。
         */
        longitude: string;
        /**
         * @summary 纬度。
         */
        latitude: string;
        /**
         * @summary 精确度，单位米 (m)。
         */
        accuracy: string;
        /**
         * @summary 水平精确度，单位为米 (m)。
         */
        horizontalAccuracy: string;
        /**
         * @summary 国家名称
         * @description `type` > 0 才会返回该字段。
         */
        country?: string;
        /**
         * @summary 国家 adcode
         * @description `type` > 0 才会返回该字段。
         */
        countryCode?: string;
        /**
         * @summary 省份名称
         * @description `type` > 0 才会返回该字段。
         */
        province?: string;
        /**
         * @summary 省份 adcode
         * @description `type` > 0 才会返回该字段。
         */
        provinceAdcode?: string;
        /**
         * @summary 城市名称
         * @description `type` > 0 才会返回该字段。
         */
        city?: string;
        /**
         * @summary 城市adcode
         * @description `type` > 0 才会返回该字段。
         */
        cityAdcode?: string;
        /**
         * @summary 区县名称
         * @description `type` > 0 才会返回该字段。
         */
        district?: string;
        /**
         * @summary 区县级别的地区代码
         * @description `type` > 0 才会返回该字段。
         */
        districtAdcode?: string;
        /**
         * @summary 需要街道级别逆地理的才会有的字段，街道门牌信息
         * @description `type` > 2 才会返回该字段。
         */
        streetNumber?: IStreetNumber;
        /**
         * @summary 定位点附近的 POI 信息
         * @description
         * - `type` > 2 才会返回该字段。
         * - POI 指 Point of Interest，兴趣点，在地理信息系统中，一个 POI 可以是一栋房子、一个商铺、一个邮筒、一个公交站等
         */
        pois?: IPoi[];
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 经度。
               */
              longitude: string;
              /**
               * @summary 纬度。
               */
              latitude: string;
              /**
               * @summary 精确度，单位米 (m)。
               */
              accuracy: string;
              /**
               * @summary 水平精确度，单位为米 (m)。
               */
              horizontalAccuracy: string;
              /**
               * @summary 国家名称
               * @description `type` > 0 才会返回该字段。
               */
              country?: string;
              /**
               * @summary 国家 adcode
               * @description `type` > 0 才会返回该字段。
               */
              countryCode?: string;
              /**
               * @summary 省份名称
               * @description `type` > 0 才会返回该字段。
               */
              province?: string;
              /**
               * @summary 省份 adcode
               * @description `type` > 0 才会返回该字段。
               */
              provinceAdcode?: string;
              /**
               * @summary 城市名称
               * @description `type` > 0 才会返回该字段。
               */
              city?: string;
              /**
               * @summary 城市adcode
               * @description `type` > 0 才会返回该字段。
               */
              cityAdcode?: string;
              /**
               * @summary 区县名称
               * @description `type` > 0 才会返回该字段。
               */
              district?: string;
              /**
               * @summary 区县级别的地区代码
               * @description `type` > 0 才会返回该字段。
               */
              districtAdcode?: string;
              /**
               * @summary 需要街道级别逆地理的才会有的字段，街道门牌信息
               * @description `type` > 2 才会返回该字段。
               */
              streetNumber?: IStreetNumber;
              /**
               * @summary 定位点附近的 POI 信息
               * @description
               * - `type` > 2 才会返回该字段。
               * - POI 指 Point of Interest，兴趣点，在地理信息系统中，一个 POI 可以是一栋房子、一个商铺、一个邮筒、一个公交站等
               */
              pois?: IPoi[];
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 经度。
       */
      longitude: string;
      /**
       * @summary 纬度。
       */
      latitude: string;
      /**
       * @summary 精确度，单位米 (m)。
       */
      accuracy: string;
      /**
       * @summary 水平精确度，单位为米 (m)。
       */
      horizontalAccuracy: string;
      /**
       * @summary 国家名称
       * @description `type` > 0 才会返回该字段。
       */
      country?: string;
      /**
       * @summary 国家 adcode
       * @description `type` > 0 才会返回该字段。
       */
      countryCode?: string;
      /**
       * @summary 省份名称
       * @description `type` > 0 才会返回该字段。
       */
      province?: string;
      /**
       * @summary 省份 adcode
       * @description `type` > 0 才会返回该字段。
       */
      provinceAdcode?: string;
      /**
       * @summary 城市名称
       * @description `type` > 0 才会返回该字段。
       */
      city?: string;
      /**
       * @summary 城市adcode
       * @description `type` > 0 才会返回该字段。
       */
      cityAdcode?: string;
      /**
       * @summary 区县名称
       * @description `type` > 0 才会返回该字段。
       */
      district?: string;
      /**
       * @summary 区县级别的地区代码
       * @description `type` > 0 才会返回该字段。
       */
      districtAdcode?: string;
      /**
       * @summary 需要街道级别逆地理的才会有的字段，街道门牌信息
       * @description `type` > 2 才会返回该字段。
       */
      streetNumber?: IStreetNumber;
      /**
       * @summary 定位点附近的 POI 信息
       * @description
       * - `type` > 2 才会返回该字段。
       * - POI 指 Point of Interest，兴趣点，在地理信息系统中，一个 POI 可以是一栋房子、一个商铺、一个邮筒、一个公交站等
       */
      pois?: IPoi[];
    }>;
    export function getMapInfo(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { is3d: boolean; isSupportAnim: boolean; sdkName: string; sdkVersion: string; isSupportOversea: boolean; needStyleV7: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              is3d: boolean;
              isSupportAnim: boolean;
              sdkName: string;
              sdkVersion: string;
              isSupportOversea: boolean;
              needStyleV7: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      is3d: boolean;
      isSupportAnim: boolean;
      sdkName: string;
      sdkVersion: string;
      isSupportOversea: boolean;
      needStyleV7: boolean;
    }>;
    export function getMenuButtonBoundingClientRect(): {
      /**
       * @summary 是否成功
       */
      success: boolean;
      /**
       * @summary 宽度，px
       */
      width: number;
      /**
       * @summary 高度，px
       */
      height: number;
      /**
       * @summary 顶部坐标
       */
      top: number;
      /**
       * @summary 右边坐标
       */
      right: number;
      /**
       * @summary 底部坐标
       */
      bottom: number;
      /**
       * @summary 左边坐标
       */
      left: number;
    };
    /**
     * @summary 获取当前网络状态
     */
    export function getNetworkType(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 网络是否可用。
         */
        networkAvailable: boolean;
        networkType: `${ENetworkType}`;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 网络是否可用。
               */
              networkAvailable: boolean;
              networkType: `${ENetworkType}`;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 网络是否可用。
       */
      networkAvailable: boolean;
      networkType: `${ENetworkType}`;
    }>;
    export function getOpenUserData(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { uid: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              uid: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      uid: string;
    }>;
    /**
     * @summary 此接口可获取支付宝会员的基础信息（头像图片地址、昵称、性别、国家码、省份、所在市区）
     */
    export function getOpenUserInfo(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 字符串（切记先 `JSON.parse` 一下）。
         * 内部字段(两层 response)：
         * - `response` 完整的对象，其值如下：
         * - `response.avatar`，类型 `string`，头像图片地址
         * - `response.nickName`，类型 `string`，昵称
         * - `response.gender`，类型 `string`，性别，男对应“m”，女对应“f”
         * - `response.countryCode`，类型 `string`，国家码
         * - `response.province`，类型 `string`，省份
         * - `response.city`，类型 `string`， 所在市区
         */
        response: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 字符串（切记先 `JSON.parse` 一下）。
               * 内部字段(两层 response)：
               * - `response` 完整的对象，其值如下：
               * - `response.avatar`，类型 `string`，头像图片地址
               * - `response.nickName`，类型 `string`，昵称
               * - `response.gender`，类型 `string`，性别，男对应“m”，女对应“f”
               * - `response.countryCode`，类型 `string`，国家码
               * - `response.province`，类型 `string`，省份
               * - `response.city`，类型 `string`， 所在市区
               */
              response: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 字符串（切记先 `JSON.parse` 一下）。
       * 内部字段(两层 response)：
       * - `response` 完整的对象，其值如下：
       * - `response.avatar`，类型 `string`，头像图片地址
       * - `response.nickName`，类型 `string`，昵称
       * - `response.gender`，类型 `string`，性别，男对应“m”，女对应“f”
       * - `response.countryCode`，类型 `string`，国家码
       * - `response.province`，类型 `string`，省份
       * - `response.city`，类型 `string`， 所在市区
       */
      response: string;
    }>;
    /**
     * @summary 在插件中获取宿主小程序的 appId。
     * @deprecated
     */
    export function getParentAppId(): string;
    /**
     * @summary 在插件中获取宿主小程序的 appId。
     */
    export function getParentAppIdSync(): {
      /**
       * @summary 使用该插件的小程序 appId
       */
      appId: string;
    };
    /**
     * @summary 获取支付宝用户绑定的手机号
     */
    export function getPhoneNumber(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 加密的数据，前端需要将该报文发送到开发者服务端做验签和解密处理（详细的服务端处理流程参考[敏感信息加解密方法](https://docs.alipay.com/mini/introduce/aes)）。
         * 解密后的字段如下：
         * - `mobile`，类型 `string`，手机号。
         */
        response: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 加密的数据，前端需要将该报文发送到开发者服务端做验签和解密处理（详细的服务端处理流程参考[敏感信息加解密方法](https://docs.alipay.com/mini/introduce/aes)）。
               * 解密后的字段如下：
               * - `mobile`，类型 `string`，手机号。
               */
              response: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 加密的数据，前端需要将该报文发送到开发者服务端做验签和解密处理（详细的服务端处理流程参考[敏感信息加解密方法](https://docs.alipay.com/mini/introduce/aes)）。
       * 解密后的字段如下：
       * - `mobile`，类型 `string`，手机号。
       */
      response: string;
    }>;
    /**
     * @summary 在插件中获取插件自身的 Id。
     */
    export function getPluginIdSync(): {
      /**
       * @summary 插件自身 Id
       */
      pluginId: string;
    };
    /**
     * @summary 获取用户一个自然天内的运动步数信息
     */
    export function getRunData(r: {
      /**
       * @summary 要查询的步数日期（`yyyy-mm-dd`）的字符串，例如：`'2018-12-19'`。
       */
      countDate: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 用于获取当前小程序的运行版本
     */
    export function getRunScene(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { envVersion: 'develop' | 'trial' | 'release' | 'gray' }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              envVersion: 'develop' | 'trial' | 'release' | 'gray';
            }
          | IFailResult,
      ): void;
    }): Promise<{
      envVersion: 'develop' | 'trial' | 'release' | 'gray';
    }>;
    /**
     * @summary 获取保存的文件信息。
     */
    export function getSavedFileInfo(r: {
      apFilePath?: string;
      filePath?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true; size: number; createTime: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
              size: number;
              createTime: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
      size: number;
      createTime: number;
    }>;
    /**
     * @summary 获取保存的所有文件信息。
     */
    export function getSavedFileList(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true; fileList: IFileInfo[] }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
              fileList: IFileInfo[];
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
      fileList: IFileInfo[];
    }>;
    /**
     * @summary 获取屏幕亮度。
     */
    export function getScreenBrightness(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true; brightness: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
              brightness: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
      brightness: number;
    }>;
    export function getScreenOrientation(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true; orientation: 'landscape' | 'portrait' }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
              orientation: 'landscape' | 'portrait';
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
      orientation: 'landscape' | 'portrait';
    }>;
    export function getSelectedTextRange(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(
        data:
          | {
              cursor: number;
            }
          | {
              start: number;
              end: number;
            },
      ): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | (
              | {
                  cursor: number;
                }
              | {
                  start: number;
                  end: number;
                }
            )
          | IFailResult,
      ): void;
    }): Promise<
      | {
          cursor: number;
        }
      | {
          start: number;
          end: number;
        }
    >;
    /**
     * @summary 获取当前服务器时间
     */
    export function getServerTime(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { time: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              time: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      time: number;
    }>;
    /**
     * @summary 获取缓存数据的异步接口
     */
    export function getStorage(r: {
      type: 'user';
      key: string;
      isAppFirstPage?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { data: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              data: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      data: string;
    }>;
    /**
     * @summary 获取当前 storage 的相关信息的异步接口
     */
    export function getStorageInfo(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { keys: string[]; currentSize: number; limitSize: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              keys: string[];
              currentSize: number;
              limitSize: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      keys: string[];
      currentSize: number;
      limitSize: number;
    }>;
    /**
     * @summary 同步获取当前storage的相关信息。
     */
    export function getStorageInfoSync(): {
      keys: string[];
      currentSize: number;
      limitSize: number;
    };
    /**
     * @summary 获取缓存数据的同步接口。
     */
    export function getStorageSync(r: { type: 'user'; key: string; isAppFirstPage?: boolean }): {
      data: string;
    };
    /**
     * @summary 获取手机系统信息。
     */
    export function getSystemInfo(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @example "alipay"
         */
        app: string;
        /**
         * @example "zh-Hans"
         */
        language: string;
        /**
         * @example 3
         */
        pixelRatio: number;
        /**
         * @summary 平台
         * @example "Android"
         */
        platform: string;
        /**
         * @example "ap"
         */
        platformType?: string;
        /**
         * @example 1080
         */
        screenWidth: number;
        /**
         * @example 48
         */
        titleBarHeight: number;
        /**
         * @example "10.2.28.1769"
         */
        version: string;
        /**
         * @example 360
         */
        windowWidth: number;
        /**
         * 上方是可以进行参数近端化处理的
         */
        /**
         * @summary 用于 Android API 版本
         * @example 29
         */
        apiLevel?: number;
        /**
         * @summary 用来区分显示企业商家服务/个人等界面信息
         * @example "normal"
         */
        appMode: string;
        /**
         * @example "HUAWEI"
         */
        brand: string;
        /**
         * @summary 当前电池电量，格式为 `{number}%`
         * @example "79%"
         */
        currentBattery: `${number}%`;
        /**
         * @example 1
         */
        fontSizeSetting: number;
        /**
         * @example "HUAWEI TAS-AL00"
         */
        model: string;
        /**
         * @summary 设备性能分级
         * @example "high"
         * @native 10.1.62
         * @ios false
         */
        performance: `${ESystemInfoPerformance}`;
        /**
         * @example {height: 753,width: 360}
         */
        screen: {
          width: number;
          height: number;
        };
        /**
         * @example 2259
         */
        screenHeight: number;
        /**
         * @example 27
         */
        statusBarHeight: number;
        /**
         * @example "118 GB"
         */
        storage: `${number} GB`;
        /**
         * @example "10"
         */
        system: string;
        /**
         * @example true
         */
        transparentTitle: boolean;
        /**
         * @example 780
         */
        windowHeight: number;
        isIphoneXSeries: boolean;
        safeArea?: {
          left: number;
          right: number;
          top: number;
          bottom: number;
          width: number;
          height: number;
        };
        /**
         * @summary 允许支付宝使用相册的开关
         * @native 10.2.0
         * @android false
         */
        albumAuthorized: boolean;
        /**
         * @summary 允许支付宝使用摄像头的开关
         * @native 10.2.0
         */
        cameraAuthorized: boolean;
        /**
         * @summary 允许支付宝使用定位的开关
         * @native 10.2.0
         */
        locationAuthorized: boolean;
        /**
         * @summary 允许支付宝使用麦克风的开关
         * @native 10.2.0
         */
        microphoneAuthorized: boolean;
        /**
         * @summary 定位的系统开关
         * @native 10.2.0
         */
        locationEnabled: boolean;
        /**
         * @summary Wi-Fi 的系统开关
         * @native 10.2.0
         */
        wifiEnabled: boolean;
        /**
         * @summary 蓝牙的系统开关
         * @native 10.2.0
         */
        bluetoothEnabled: boolean;
        /**
         * @summary 允许支付宝使用蓝牙的开关
         * @native 10.2.0
         */
        bluetoothAuthorized: boolean;
        /**
         * @summary 允许支付宝通知的开关
         * @native 10.2.0
         */
        notificationAuthorized: boolean;
        /**
         * @summary 允许支付宝通知带有提醒的开关
         * @native 10.2.0
         * @android false
         */
        notificationAlertAuthorized: boolean;
        /**
         * @summary 允许支付宝通知带有标记的开关
         * @native 10.2.0
         * @android false
         */
        notificationBadgeAuthorized: boolean;
        /**
         * @summary 允许支付宝啊通知带有声音的开关
         * @native 10.2.0
         * @android false
         */
        notificationSoundAuthorized: boolean;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @example "alipay"
               */
              app: string;
              /**
               * @example "zh-Hans"
               */
              language: string;
              /**
               * @example 3
               */
              pixelRatio: number;
              /**
               * @summary 平台
               * @example "Android"
               */
              platform: string;
              /**
               * @example "ap"
               */
              platformType?: string;
              /**
               * @example 1080
               */
              screenWidth: number;
              /**
               * @example 48
               */
              titleBarHeight: number;
              /**
               * @example "10.2.28.1769"
               */
              version: string;
              /**
               * @example 360
               */
              windowWidth: number;
              /**
               * 上方是可以进行参数近端化处理的
               */
              /**
               * @summary 用于 Android API 版本
               * @example 29
               */
              apiLevel?: number;
              /**
               * @summary 用来区分显示企业商家服务/个人等界面信息
               * @example "normal"
               */
              appMode: string;
              /**
               * @example "HUAWEI"
               */
              brand: string;
              /**
               * @summary 当前电池电量，格式为 `{number}%`
               * @example "79%"
               */
              currentBattery: `${number}%`;
              /**
               * @example 1
               */
              fontSizeSetting: number;
              /**
               * @example "HUAWEI TAS-AL00"
               */
              model: string;
              /**
               * @summary 设备性能分级
               * @example "high"
               * @native 10.1.62
               * @ios false
               */
              performance: `${ESystemInfoPerformance}`;
              /**
               * @example {height: 753,width: 360}
               */
              screen: {
                width: number;
                height: number;
              };
              /**
               * @example 2259
               */
              screenHeight: number;
              /**
               * @example 27
               */
              statusBarHeight: number;
              /**
               * @example "118 GB"
               */
              storage: `${number} GB`;
              /**
               * @example "10"
               */
              system: string;
              /**
               * @example true
               */
              transparentTitle: boolean;
              /**
               * @example 780
               */
              windowHeight: number;
              isIphoneXSeries: boolean;
              safeArea?: {
                left: number;
                right: number;
                top: number;
                bottom: number;
                width: number;
                height: number;
              };
              /**
               * @summary 允许支付宝使用相册的开关
               * @native 10.2.0
               * @android false
               */
              albumAuthorized: boolean;
              /**
               * @summary 允许支付宝使用摄像头的开关
               * @native 10.2.0
               */
              cameraAuthorized: boolean;
              /**
               * @summary 允许支付宝使用定位的开关
               * @native 10.2.0
               */
              locationAuthorized: boolean;
              /**
               * @summary 允许支付宝使用麦克风的开关
               * @native 10.2.0
               */
              microphoneAuthorized: boolean;
              /**
               * @summary 定位的系统开关
               * @native 10.2.0
               */
              locationEnabled: boolean;
              /**
               * @summary Wi-Fi 的系统开关
               * @native 10.2.0
               */
              wifiEnabled: boolean;
              /**
               * @summary 蓝牙的系统开关
               * @native 10.2.0
               */
              bluetoothEnabled: boolean;
              /**
               * @summary 允许支付宝使用蓝牙的开关
               * @native 10.2.0
               */
              bluetoothAuthorized: boolean;
              /**
               * @summary 允许支付宝通知的开关
               * @native 10.2.0
               */
              notificationAuthorized: boolean;
              /**
               * @summary 允许支付宝通知带有提醒的开关
               * @native 10.2.0
               * @android false
               */
              notificationAlertAuthorized: boolean;
              /**
               * @summary 允许支付宝通知带有标记的开关
               * @native 10.2.0
               * @android false
               */
              notificationBadgeAuthorized: boolean;
              /**
               * @summary 允许支付宝啊通知带有声音的开关
               * @native 10.2.0
               * @android false
               */
              notificationSoundAuthorized: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @example "alipay"
       */
      app: string;
      /**
       * @example "zh-Hans"
       */
      language: string;
      /**
       * @example 3
       */
      pixelRatio: number;
      /**
       * @summary 平台
       * @example "Android"
       */
      platform: string;
      /**
       * @example "ap"
       */
      platformType?: string;
      /**
       * @example 1080
       */
      screenWidth: number;
      /**
       * @example 48
       */
      titleBarHeight: number;
      /**
       * @example "10.2.28.1769"
       */
      version: string;
      /**
       * @example 360
       */
      windowWidth: number;
      /**
       * 上方是可以进行参数近端化处理的
       */
      /**
       * @summary 用于 Android API 版本
       * @example 29
       */
      apiLevel?: number;
      /**
       * @summary 用来区分显示企业商家服务/个人等界面信息
       * @example "normal"
       */
      appMode: string;
      /**
       * @example "HUAWEI"
       */
      brand: string;
      /**
       * @summary 当前电池电量，格式为 `{number}%`
       * @example "79%"
       */
      currentBattery: `${number}%`;
      /**
       * @example 1
       */
      fontSizeSetting: number;
      /**
       * @example "HUAWEI TAS-AL00"
       */
      model: string;
      /**
       * @summary 设备性能分级
       * @example "high"
       * @native 10.1.62
       * @ios false
       */
      performance: `${ESystemInfoPerformance}`;
      /**
       * @example {height: 753,width: 360}
       */
      screen: {
        width: number;
        height: number;
      };
      /**
       * @example 2259
       */
      screenHeight: number;
      /**
       * @example 27
       */
      statusBarHeight: number;
      /**
       * @example "118 GB"
       */
      storage: `${number} GB`;
      /**
       * @example "10"
       */
      system: string;
      /**
       * @example true
       */
      transparentTitle: boolean;
      /**
       * @example 780
       */
      windowHeight: number;
      isIphoneXSeries: boolean;
      safeArea?: {
        left: number;
        right: number;
        top: number;
        bottom: number;
        width: number;
        height: number;
      };
      /**
       * @summary 允许支付宝使用相册的开关
       * @native 10.2.0
       * @android false
       */
      albumAuthorized: boolean;
      /**
       * @summary 允许支付宝使用摄像头的开关
       * @native 10.2.0
       */
      cameraAuthorized: boolean;
      /**
       * @summary 允许支付宝使用定位的开关
       * @native 10.2.0
       */
      locationAuthorized: boolean;
      /**
       * @summary 允许支付宝使用麦克风的开关
       * @native 10.2.0
       */
      microphoneAuthorized: boolean;
      /**
       * @summary 定位的系统开关
       * @native 10.2.0
       */
      locationEnabled: boolean;
      /**
       * @summary Wi-Fi 的系统开关
       * @native 10.2.0
       */
      wifiEnabled: boolean;
      /**
       * @summary 蓝牙的系统开关
       * @native 10.2.0
       */
      bluetoothEnabled: boolean;
      /**
       * @summary 允许支付宝使用蓝牙的开关
       * @native 10.2.0
       */
      bluetoothAuthorized: boolean;
      /**
       * @summary 允许支付宝通知的开关
       * @native 10.2.0
       */
      notificationAuthorized: boolean;
      /**
       * @summary 允许支付宝通知带有提醒的开关
       * @native 10.2.0
       * @android false
       */
      notificationAlertAuthorized: boolean;
      /**
       * @summary 允许支付宝通知带有标记的开关
       * @native 10.2.0
       * @android false
       */
      notificationBadgeAuthorized: boolean;
      /**
       * @summary 允许支付宝啊通知带有声音的开关
       * @native 10.2.0
       * @android false
       */
      notificationSoundAuthorized: boolean;
    }>;
    /**
     * @summary 获取手机系统信息的同步接口
     */
    export function getSystemInfoSync(): {
      /**
       * @example "alipay"
       */
      app: string;
      /**
       * @example "zh-Hans"
       */
      language: string;
      /**
       * @example 3
       */
      pixelRatio: number;
      /**
       * @summary 平台
       * @example "Android"
       */
      platform: string;
      /**
       * @example "ap"
       */
      platformType?: string;
      /**
       * @example 1080
       */
      screenWidth: number;
      /**
       * @example 48
       */
      titleBarHeight: number;
      /**
       * @example "10.2.28.1769"
       */
      version: string;
      /**
       * @example 360
       */
      windowWidth: number;
      /**
       * 上方是可以进行参数近端化处理的
       */
      /**
       * @summary 用于 Android API 版本
       * @example 29
       */
      apiLevel?: number;
      /**
       * @summary 用来区分显示企业商家服务/个人等界面信息
       * @example "normal"
       */
      appMode: string;
      /**
       * @example "HUAWEI"
       */
      brand: string;
      /**
       * @summary 当前电池电量，格式为 `{number}%`
       * @example "79%"
       */
      currentBattery: `${number}%`;
      /**
       * @example 1
       */
      fontSizeSetting: number;
      /**
       * @example "HUAWEI TAS-AL00"
       */
      model: string;
      /**
       * @summary 设备性能分级
       * @example "high"
       * @native 10.1.62
       * @ios false
       */
      performance: `${ESystemInfoPerformance}`;
      /**
       * @example {height: 753,width: 360}
       */
      screen: {
        width: number;
        height: number;
      };
      /**
       * @example 2259
       */
      screenHeight: number;
      /**
       * @example 27
       */
      statusBarHeight: number;
      /**
       * @example "118 GB"
       */
      storage: `${number} GB`;
      /**
       * @example "10"
       */
      system: string;
      /**
       * @example true
       */
      transparentTitle: boolean;
      /**
       * @example 780
       */
      windowHeight: number;
      isIphoneXSeries: boolean;
      safeArea?: {
        left: number;
        right: number;
        top: number;
        bottom: number;
        width: number;
        height: number;
      };
      /**
       * @summary 允许支付宝使用相册的开关
       * @native 10.2.0
       * @android false
       */
      albumAuthorized: boolean;
      /**
       * @summary 允许支付宝使用摄像头的开关
       * @native 10.2.0
       */
      cameraAuthorized: boolean;
      /**
       * @summary 允许支付宝使用定位的开关
       * @native 10.2.0
       */
      locationAuthorized: boolean;
      /**
       * @summary 允许支付宝使用麦克风的开关
       * @native 10.2.0
       */
      microphoneAuthorized: boolean;
      /**
       * @summary 定位的系统开关
       * @native 10.2.0
       */
      locationEnabled: boolean;
      /**
       * @summary Wi-Fi 的系统开关
       * @native 10.2.0
       */
      wifiEnabled: boolean;
      /**
       * @summary 蓝牙的系统开关
       * @native 10.2.0
       */
      bluetoothEnabled: boolean;
      /**
       * @summary 允许支付宝使用蓝牙的开关
       * @native 10.2.0
       */
      bluetoothAuthorized: boolean;
      /**
       * @summary 允许支付宝通知的开关
       * @native 10.2.0
       */
      notificationAuthorized: boolean;
      /**
       * @summary 允许支付宝通知带有提醒的开关
       * @native 10.2.0
       * @android false
       */
      notificationAlertAuthorized: boolean;
      /**
       * @summary 允许支付宝通知带有标记的开关
       * @native 10.2.0
       * @android false
       */
      notificationBadgeAuthorized: boolean;
      /**
       * @summary 允许支付宝啊通知带有声音的开关
       * @native 10.2.0
       * @android false
       */
      notificationSoundAuthorized: boolean;
    };
    export function getTBCode(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true; code: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
              code: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
      code: string;
    }>;
    export function getTBSessionInfo(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { data: Record<string, unknown> }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              data: Record<string, unknown>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      data: Record<string, unknown>;
    }>;
    /**
     * @summary 获取导航栏背景色。
     */
    export function getTitleColor(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 返回当前导航栏背景色
         * @description ARGB 格式的十六进制颜色值，如 #323239FF。
         */
        color: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 返回当前导航栏背景色
               * @description ARGB 格式的十六进制颜色值，如 #323239FF。
               */
              color: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 返回当前导航栏背景色
       * @description ARGB 格式的十六进制颜色值，如 #323239FF。
       */
      color: string;
    }>;
    export function getVisitToken(r: {
      tokenType: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 生产的 token 值。
         */
        token: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 生产的 token 值。
               */
              token: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 生产的 token 值。
       */
      token: string;
    }>;
    export function getWifiBroadcastInfo(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { address: string; broadcastAddr: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              address: string;
              broadcastAddr: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      address: string;
      broadcastAddr: string;
    }>;
    export function getWifiList(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 隐藏当前页面通用菜单中的 添加到桌面 功能
     */
    export function hideAddToDesktopMenu(r: {
      name: 'backToHome' | 'favorite' | 'add2Desktop';
      scope: 'single' | 'all';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 隐藏所有页面的通用菜单中的 添加到桌面功能
     */
    export function hideAllAddToDesktopMenu(r: {
      name: 'backToHome' | 'favorite' | 'add2Desktop';
      scope: 'single' | 'all';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 隐藏 **所有页面** 的通用菜单中的 **收藏** 功能。
     */
    export function hideAllFavoriteMenu(r: {
      name: 'backToHome' | 'favorite' | 'add2Desktop';
      scope: 'single' | 'all';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 隐藏标题栏上的返回首页图标和右上角通用菜单中的返回首页
     * @description
     * 用户启动小程序时，若进入的页面不是小程序首页，则会在左上角出现返回首页图标。
     * 如果 app.json 中配置了 tabbar 跳转 pages/index/index 时，则左上角不会出现 返回首页 icon 图标。
     */
    export function hideBackHome(r: {
      name: 'backToHome' | 'favorite' | 'add2Desktop';
      scope: 'single' | 'all';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function hideDebugVersion(hide?: boolean): void;
    /**
     * @summary 隐藏 **当前页面** 的通用菜单中的 **收藏** 按钮。
     */
    export function hideFavoriteMenu(r: {
      name: 'backToHome' | 'favorite' | 'add2Desktop';
      scope: 'single' | 'all';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 隐藏键盘。
     */
    export function hideKeyboard(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 隐藏加载提示的过渡效果
     * @description 可与 [my.showLoading]() 配合使用
     */
    export function hideLoading(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 在当前页面隐藏导航条的加载动画。
     */
    export function hideNavigationBarLoading(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 隐藏分享按钮。
     */
    export function hideShareMenu(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 隐藏标签栏 TabBar。
     */
    export function hideTabBar(r: {
      /**
       * @summary 是否需要动画效果，默认为无动画效果。
       * @default false
       */
      animation?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 隐藏标签页（TabBar）某一项右上角的红点
     */
    export function hideTabBarRedDot(r: {
      /**
       * @summary 标签页的项数序号，从左边开始计数。
       */
      index: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 隐藏弱提示。
     */
    export function hideToast(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function httpRequest(r: {
      /**
       * @summary 目标服务器 URL。
       */
      url: string;
      /**
       * @summary 设置请求的 HTTP 头对象，该对象里面的 `key` 和 `value` 必须是 `string` 类型。
       * @default {'content-type': 'application/x-www-form-urlencoded'}
       */
      headers?: Record<string, string>;
      /**
       * @default GET
       */
      method?: string;
      /**
       * @summary 请求参数。
       */
      data?: string | Record<string, unknown>;
      /**
       * @summary 超时时间，单位 `ms`。
       * @default 30000
       */
      timeout?: number;
      /**
       * @summary 期望返回的数据格式。
       * @default JSON
       */
      dataType?: 'json' | 'text' | 'base64';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 响应数据，格式取决于请求时的 `dataType` 参数。
         */
        data: string | Record<string, unknown>;
        /**
         * @summary 响应码。
         */
        status: number;
        /**
         * @summary 响应头。
         */
        headers: Record<string, string>;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 响应数据，格式取决于请求时的 `dataType` 参数。
               */
              data: string | Record<string, unknown>;
              /**
               * @summary 响应码。
               */
              status: number;
              /**
               * @summary 响应头。
               */
              headers: Record<string, string>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 响应数据，格式取决于请求时的 `dataType` 参数。
       */
      data: string | Record<string, unknown>;
      /**
       * @summary 响应码。
       */
      status: number;
      /**
       * @summary 响应头。
       */
      headers: Record<string, string>;
    }>;
    /**
     * @summary 查询当前小程序是否被收藏。
     */
    export function isCollected(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 当前小程序是否收藏，`true` 为已收藏，`false` 为未收藏。
         */
        isCollected: boolean;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 当前小程序是否收藏，`true` 为已收藏，`false` 为未收藏。
               */
              isCollected: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 当前小程序是否收藏，`true` 为已收藏，`false` 为未收藏。
       */
      isCollected: boolean;
    }>;
    /**
     * @summary 查询当前小程序是否被收藏。
     */
    export function isFavorite(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 当前小程序是否收藏，`true` 为已收藏，`false` 为未收藏。
         */
        isFavorite: boolean;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 当前小程序是否收藏，`true` 为已收藏，`false` 为未收藏。
               */
              isFavorite: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 当前小程序是否收藏，`true` 为已收藏，`false` 为未收藏。
       */
      isFavorite: boolean;
    }>;
    export function isLowPowerMode(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { isLowPowerMode: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              isLowPowerMode: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      isLowPowerMode: boolean;
    }>;
    export function isScreenReaderEnabled(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { screenReaderEnabled: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              screenReaderEnabled: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      screenReaderEnabled: boolean;
    }>;
    export function isSpeechRecognizeAvailable(r: {
      extraInfo?: Record<string, string>;
      speechRecognizeBizId?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: boolean;
    }>;
    export function isSystemRoot(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { isSystemRoot: 'true' | 'false' }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              isSystemRoot: 'true' | 'false';
            }
          | IFailResult,
      ): void;
    }): Promise<{
      isSystemRoot: 'true' | 'false';
    }>;
    /**
     * @summary 动态加载网络字体
     * @description
     * 支付宝小程序目前只支持 woff，otf，ttf，sfnt 字体，不支持 woff2 字体
     */
    export function loadFontFace(r: {
      /**
       * @summary 是否同时加载 NativeCanvas 字体
       * @default true
       */
      nativeCanvas?: boolean;
      /**
       * @summary 字体名称
       */
      family: string;
      /**
       * @summary 字体资源地址
       * @description
       * 文件地址需为下载类型
       * iOS 仅支持 HTTPS 格式文件地址。
       */
      source: string;
      /**
       * @summary 字体描述符
       */
      desc?: {
        /**
         * @summary 字体样式
         * @description 可选值为 normal / italic / oblique
         * @default "normal"
         */
        style?: string;
        /**
         * @summary 设置小型大写字母的字体显示文本
         * @default "normal"
         */
        variant?: string;
        /**
         * @summary 字体粗细
         * @default "normal"
         */
        weight?: string;
        stretch?: string;
        featureSetting?: string;
        unicodeRange?: string;
      };
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { status: 'loaded' }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              status: 'loaded';
            }
          | IFailResult,
      ): void;
    }): Promise<{
      status: 'loaded';
    }>;
    export function loadPlugin(r: {
      /**
       * @summary 需要加载的插件 id。也可以指定要加载的插件id和版本号。
       * 例如：`2019235609092837@*`，为 `*` 时则距离上次拉包超过24小时会拉取最新版本。
       */
      plugin: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function makeBluetoothPair(r: {
      deviceId: string;
      pin: string;
      timeout?: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 拨打电话。
     */
    export function makePhoneCall(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function requestSubscribeMessage(r: {
      appId?: string;
      thirdTypeAppId?: string;
      entityIds: string[];
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 接口调用是否成功
         */
        success: boolean;
        /**
         * @summary 错误码。
         */
        error: number;
        /**
         * @summary 错误信息。
         */
        errorMessage: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 接口调用是否成功
               */
              success: boolean;
              /**
               * @summary 错误码。
               */
              error: number;
              /**
               * @summary 错误信息。
               */
              errorMessage: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 接口调用是否成功
       */
      success: boolean;
      /**
       * @summary 错误码。
       */
      error: number;
      /**
       * @summary 错误信息。
       */
      errorMessage: string;
    }>;
    /**
     * @summary 级联选择功能，主要用于选择多级关联数据，比如省市区的信息选择。
     */
    export function multiLevelSelect(r: {
      result?: Array<{
        name: string;
      }>;
      title?: string;
      list: IListItem[];
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        success: true;
        result: Array<{
          name: string;
        }>;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
              result: Array<{
                name: string;
              }>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
      result: Array<{
        name: string;
      }>;
    }>;
    /**
     * @summary 关闭当前页面，返回上一级或多级页面
     */
    export function navigateBack(r: {
      /**
       * @summary 返回的页面数
       * @description 如果 delta 大于现有打开的页面数，则返回到首页
       * @default 1
       */
      delta?: number | string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 从插件返回宿主小程序。
     */
    export function navigateBackFromMiniService(r: {
      [x: string]: unknown;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 跳转回上一个小程序
     */
    export function navigateBackMiniProgram(r: {
      /**
       * @summary 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据。
       */
      extraData?: Record<string, unknown>;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 从当前页面，跳转到当前应用内的某个指定页面
     * @description
     * 可使用 [my.navigateBack]() 返回到原来页面。
     * 小程序中页面栈最多十层。
     * [my.navigateTo]() 和 [my.redirectTo]() 不允许跳转到 Tab 页面；若需跳转到 Tab 页面，请使用 my.switchTab。
     */
    export function navigateTo(r: {
      /**
       * @summary 需要跳转的目标页面路径
       * @description 路径后可以带参数, 目标路径必须为应用内非 tabbar 的，路径与参数之间使用 ?分隔，参数键与参数值用=相连，不同参数必须用&分隔
       * @example page/index/index?key1=value1&key2=value2
       */
      url: string;
      /**
       * @summary 页面间通信接口，用于监听被打开页面发送到当前页面的数据
       */
      events?: {
        [eventName: string]: (...args: unknown[]) => void;
      };
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 和被打开页面进行通信
         */
        eventChannel: {
          emit(eventName: string, ...args: unknown[]): void;
          on(eventName: string, eventCallback: (...args: unknown[]) => void): void;
          once(eventName: string, eventCallback: (...args: unknown[]) => void): void;
          off(eventName: string, eventCallback: (...args: unknown[]) => void): void;
        };
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 和被打开页面进行通信
               */
              eventChannel: {
                emit(eventName: string, ...args: unknown[]): void;
                on(eventName: string, eventCallback: (...args: unknown[]) => void): void;
                once(eventName: string, eventCallback: (...args: unknown[]) => void): void;
                off(eventName: string, eventCallback: (...args: unknown[]) => void): void;
              };
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 和被打开页面进行通信
       */
      eventChannel: {
        emit(eventName: string, ...args: unknown[]): void;
        on(eventName: string, eventCallback: (...args: unknown[]) => void): void;
        once(eventName: string, eventCallback: (...args: unknown[]) => void): void;
        off(eventName: string, eventCallback: (...args: unknown[]) => void): void;
      };
    }>;
    /**
     * @summary 跳转到其他小程序
     */
    export function navigateToMiniProgram(r: {
      /**
       * @summary 要跳转的目标小程序appId。
       */
      appId: string;
      /**
       * @summary 打开的页面路径，如果为空则打开首页。
       */
      path?: string;
      /**
       * @summary 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据。
       */
      extraData?: Record<string, unknown>;
      /**
       * @summary 仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是正式版，则打开的小程序必定是正式版。
       * @default "release"
       */
      envVersion?: 'develop' | 'trial' | 'release';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 打开小程序插件(1.0 小服务)
     */
    export function navigateToMiniService(r: {
      /**
       * @summary 已订购的插件id。
       */
      serviceId: string;
      servicePage?: string;
      /**
       * @summary 需要传递给目标插件的数据，插件可在 `App.onLaunch(options)`，`App.onShow(options)` 中获取到这份数据。
       */
      extraData?: Record<string, unknown>;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 返回宿主小程序的方式。
         */
        action: 'complete' | 'cancel';
        /**
         * @summary 通过 `navigateBackFromMiniService` 传递的数据。
         */
        data: Record<string, unknown>;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 返回宿主小程序的方式。
               */
              action: 'complete' | 'cancel';
              /**
               * @summary 通过 `navigateBackFromMiniService` 传递的数据。
               */
              data: Record<string, unknown>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 返回宿主小程序的方式。
       */
      action: 'complete' | 'cancel';
      /**
       * @summary 通过 `navigateBackFromMiniService` 传递的数据。
       */
      data: Record<string, unknown>;
    }>;
    export function navigateToSetting(r: {
      option?: 'bluetooth' | 'wifi' | 'nfc' | 'gps';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 启用低功耗蓝牙设备特征值变化时的 notify 功能。
     */
    export function notifyBLECharacteristicValueChange(r: {
      serviceId: string;
      deviceId: string;
      characteristicId: string;
      descriptorId?: string;
      state?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 停止监听加速度数据。
     */
    export function offAccelerometerChange(
      cb: (arg: {
        /**
         * @summary x 轴。
         */
        x: number;
        /**
         * @summary y 轴。
         */
        y: number;
        /**
         * @summary z 轴。
         */
        z: number;
        timestamp: number;
      }) => void,
    ): void;
    /**
     * @summary 取消监听小程序切后台事件
     * @description 请勿使用 API 监听匿名函数，否则将无法关闭监听
     */
    export function offAppHide(cb: () => void): void;
    /**
     * @summary 取消监听小程序切前台事件
     */
    export function offAppShow(cb: () => void): void;
    /**
     * @summary 取消监听音频因为系统占用而被中断的开始事件
     */
    export function offAudioInterruptionBegin(cb: () => void): void;
    /**
     * @summary 取消监听音频被中断的结束事件
     */
    export function offAudioInterruptionEnd(cb: () => void): void;
    /**
     * @summary 取消监听低功耗蓝牙设备的特征值变化的事件。
     */
    export function offBLECharacteristicValueChange(
      cb: (arg: {
        /**
         * @summary 蓝牙设备 ID。
         */
        deviceId: string;
        serviceId: string;
        characteristicId: string;
        value: string;
      }) => void,
    ): void;
    /**
     * @summary 移除低功耗蓝牙连接状态变化事件的监听
     */
    export function offBLEConnectionStateChanged(
      cb: (arg: {
        /**
         * @summary 蓝牙设备 ID。
         */
        deviceId: string;
        /**
         * @summary 连接目前的状态。
         */
        connected: boolean;
      }) => void,
    ): void;
    export function offBackgroundAudioPause(
      cb: (arg: {
        /**
         * - -1: Error
         * - 0: Paused
         * - 1: Playing/Ready
         * - 2: Unknown
         * - 3: Loading
         */
        status: number;
        currentPosition: number;
        duration: number;
        downloadPercent: number;
        audioDataUrl: string;
        bizExtraParamsJsonObj?: unknown;
      }) => void,
    ): void;
    export function offBackgroundAudioPlay(
      cb: (arg: {
        /**
         * - -1: Error
         * - 0: Paused
         * - 1: Playing/Ready
         * - 2: Unknown
         * - 3: Loading
         */
        status: number;
        currentPosition: number;
        duration: number;
        downloadPercent: number;
        audioDataUrl: string;
        bizExtraParamsJsonObj?: unknown;
      }) => void,
    ): void;
    export function offBackgroundAudioStop(
      cb: (arg: {
        /**
         * - -1: Error
         * - 0: Paused
         * - 1: Playing/Ready
         * - 2: Unknown
         * - 3: Loading
         */
        status: number;
        currentPosition: number;
        duration: number;
        downloadPercent: number;
        audioDataUrl: string;
        bizExtraParamsJsonObj?: unknown;
      }) => void,
    ): void;
    export function offBeaconServiceChange(
      cb: (arg: {
        /**
         * @summary 服务目前是否可用。
         */
        available: boolean;
        /**
         * @summary 目前是否处于搜索状态。
         */
        discovering: boolean;
      }) => void,
    ): void;
    export function offBeaconUpdate(
      cb: (arg: {
        /**
         * @summary 当前搜寻到的所有 iBeacon 设备列表。
         */
        beacons: IBeaconDevice[];
      }) => void,
    ): void;
    /**
     * @summary 移除本机蓝牙状态变化的事件的监听。
     */
    export function offBluetoothAdapterStateChange(
      cb: (arg: {
        /**
         * @summary 蓝牙模块是否可用。
         */
        available: boolean | 'true' | 'false';
        /**
         * @summary 蓝牙模块是否处于搜索状态。
         */
        discovering: boolean;
      }) => void,
    ): void;
    /**
     * @summary 移除寻找到新的蓝牙设备事件的监听。
     */
    export function offBluetoothDeviceFound(
      cb: (arg: {
        /**
         * @summary 新搜索到的设备列表。
         */
        devices: IBluetoothDevice[];
      }) => void,
    ): void;
    export function offCharacteristicDidSubscribe(
      cb: (arg: {
        /**
         * @summary 特征值 Id。
         */
        charcateristicId: number;
        /**
         * @summary 服务 Id。
         */
        serviceId: number;
        /**
         * @summary 连接设备 Id。
         */
        deviceId: string;
      }) => void,
    ): void;
    export function offCharacteristicDidUnsubscribe(
      cb: (arg: {
        /**
         * @summary 特征值 Id。
         */
        charcateristicId: number;
        /**
         * @summary 服务 Id。
         */
        serviceId: number;
        /**
         * @summary 连接设备 Id。
         */
        deviceId: string;
      }) => void,
    ): void;
    export function offCharacteristicRead(
      cb: (arg: {
        /**
         * @summary 特征值 Id。
         */
        charcateristicId: number;
        /**
         * @summary 服务 Id。
         */
        serviceId: number;
        /**
         * @summary 连接设备 Id。
         */
        deviceId: string;
        data: string;
      }) => void,
    ): void;
    export function offCharacteristicWrite(
      cb: (arg: {
        /**
         * @summary 特征值 Id。
         */
        charcateristicId: number;
        /**
         * @summary 服务 Id。
         */
        serviceId: number;
        /**
         * @summary 连接设备 Id。
         */
        deviceId: string;
        data: string;
      }) => void,
    ): void;
    /**
     * @summary 停止监听罗盘数据。
     */
    export function offCompassChange(
      cb: (arg: {
        /**
         * @summary 面对的方向与正北方向的度数，值的范围为 `[0, 360)`。
         */
        direction: number;
      }) => void,
    ): void;
    /**
     * @summary 是用于取消监听小程序自定义组件内部 JS 代码的 `error` 事件。
     */
    export function offComponentError(
      cb: /**
       * @param error 异常对象
       * @param method 异常发生所在的自定义组件方法
       * @param componentInstance 异常发生所在的自定义组件实例
       */
      (error: Error, method: string, componentInstance: any) => void,
    ): void;
    /**
     * @summary 取消监听持续定位位置信息。
     */
    export function offContinuousLocation(
      cb: (arg: {
        /**
         * @summary 纬度。
         */
        latitude: number;
        /**
         * @summary 经度。
         */
        longitude: number;
        /**
         * @summary 精确度，单位 m。
         */
        accurary: number;
      }) => void,
    ): void;
    export function offDecibelChange(cb: (arg: { decibel: number }) => void): void;
    export function offDeviceConnected(
      cb: (arg: {
        /**
         * @summary 连接设备 Id。
         */
        deviceId: string;
      }) => void,
    ): void;
    export function offDeviceDisconnected(
      cb: (arg: {
        /**
         * @summary 连接设备 Id。
         */
        deviceId: string;
      }) => void,
    ): void;
    export function offDeviceMotionChange(
      cb: (arg: {
        /**
         * @summary 当手机坐标 X/Y 和 地球 X/Y 重合时，绕着 Z 轴转动的夹角为 `alpha`。
         * - 值的范围为 `[0, 2*PI)`。
         * - 逆时针转动为正。
         */
        alpha: number;
        /**
         * @summary 当手机坐标 Y/Z 和地球 Y/Z 重合时，绕着 X 轴转动的夹角为 `beta`。
         * - 值的范围为 `[-1*PI, PI)`。
         * - 顶部朝着地球表面转动为正，也有可能朝着用户为正。
         */
        beta: number;
        /**
         * @summary 当手机 X/Z 和地球 X/Z 重合时，绕着 Y 轴转动的夹角为 `gamma`。
         * - 值的范围为 `[-1*PI/2, PI/2)`。
         * - 右边朝着地球表面转动为正。
         */
        gamma: number;
      }) => void,
    ): void;
    /**
     * @summary 是取消监听小程序错误事件的 API
     */
    export function offError(
      cb: /**
       * @param message 异常信息
       * @param stack 异常堆栈
       */
      (message: string, stack: string) => void,
    ): void;
    /**
     * @summary 取消监听添加/取消收藏事件。
     */
    export function offFavorite(
      cb: (arg: {
        /**
         * @summary 触发事件的行为是否成功，`true` 为成功，`false` 为失败。
         */
        success: boolean;
        /**
         * @summary 触发事件的行为，目前就添加收藏和取消收藏两种行为。
         */
        action: 'addToFavorite' | 'removeFromFavorite';
      }) => void,
    ): void;
    export function offGetWifiList(
      cb: (arg: {
        /**
         * @summary Wifi 列表数据。
         */
        wifiList: IWifiInfo[];
      }) => void,
    ): void;
    /**
     * @summary 停止监听陀螺仪数据。
     */
    export function offGyroscopeChange(
      cb: (arg: {
        /**
         * @summary x 轴方向角速度。
         */
        x: number;
        /**
         * @summary y 轴方向角速度。
         */
        y: number;
        /**
         * @summary z 轴方向角速度。
         */
        z: number;
        timestamp: number;
      }) => void,
    ): void;
    export function offHCEMessage(
      cb: (arg: {
        /**
         * @summary 消息类型。
         * 有效值：
         * - `1` 消息为 HCE Apdu Command 类型，小程序需对此指令进行处理，并调用 `sendHCEMessage` 接口返回处理指令。
         * - `2` 消息为设备离场事件。
         */
        messageType: number;
        /**
         * @summary 客户端接收到 NFC 设备的指令，此参数当且仅当 `messageType=1` 时有效。
         */
        data?: ArrayBuffer;
        /**
         * @summary 此参数当且仅当 `messageType=2` 时有效。
         */
        reason?: string;
      }) => void,
    ): void;
    /**
     * @summary 取消监听添加/取消收藏事件。
     */
    export function offInternalFavorite(
      cb: (arg: {
        /**
         * @summary 触发事件的行为是否成功，`true` 为成功，`false` 为失败。
         */
        success: boolean;
        /**
         * @summary 触发事件的行为，目前就添加收藏和取消收藏两种行为。
         */
        action: 'addToFavorite' | 'removeFromFavorite';
      }) => void,
    ): void;
    export function offIotNotify(
      cb: (arg: {
        /**
         * @summary 业务类型，目前只有一个值：`sync`
         */
        bizType: string;
        /**
         * @summary 消息内容。
         * - 如果 bizType 为 sync，消息体见 https://yuque.antfin-inc.com/books/share/45b293db-e20a-41f9-a2d7-b0bd959d18ac/ku95pw#DSSYc
         */
        data: string;
      }) => void,
    ): void;
    export function offIotRawMessage(
      cb: (arg: {
        /**
         * @summary 厂商推送的原始消息
         */
        rawMessage: string;
      }) => void,
    ): void;
    export function offLocalServiceDiscoveryStop(cb: () => void): void;
    export function offLocalServiceFound(
      cb: (arg: {
        /**
         * @summary 服务类型。
         */
        serviceType: string;
        /**
         * @summary 服务名称。
         */
        serviceName: string;
        /**
         * @summary 服务的端口。
         */
        port: number;
        /**
         * @summary 服务的 ip 地址。
         */
        ip: string;
      }) => void,
    ): void;
    export function offLocalServiceLost(
      cb: (arg: {
        /**
         * @summary 服务类型。
         */
        serviceType: string;
        /**
         * @summary 服务名称。
         */
        serviceName: string;
      }) => void,
    ): void;
    export function offLocalServiceResolveFail(
      cb: (arg: {
        /**
         * @summary 服务类型。
         */
        serviceType: string;
        /**
         * @summary 服务名称。
         */
        serviceName: string;
      }) => void,
    ): void;
    /**
     * @summary 取消监听地理位置定位完成事件，只针对 `chooseCity` 中属性 `setLocatedCity` 为 `true` 的情况。
     */
    export function offLocatedComplete(
      cb: (arg: {
        /**
         * @summary 当前定位城市经度。
         */
        longitude: number;
        /**
         * @summary 当前定位城市经度。
         */
        latitude: number;
        /**
         * @summary 当前定位城市 id，setLocatedCity 的时候带上。
         */
        locatedCityId: string;
      }) => void,
    ): void;
    /**
     * @summary 停止监听设备是否进入低电量模式事件。
     */
    export function offLowPowerWarning(
      cb: (arg: {
        /**
         * @summary 设备是否是低电量模式。
         */
        isLowPowerMode: boolean;
      }) => void,
    ): void;
    /**
     * @summary 停止监听内存不足的告警事件
     */
    export function offMemoryWarning(
      cb: (arg: {
        /**
         * @summary 系统内存的告警等级
         * @description
         * - 仅 Android 返回，iOS 不返回，需要兼容判断
         * @ios false
         */
        level?: EMemoryWarningLevel;
      }) => void,
    ): void;
    /**
     * @summary 取消监听网络状态变化。
     */
    export function offNetworkStatusChange(
      cb: (arg: {
        /**
         * @summary 网络是否可用。
         */
        isConnected: boolean;
        /**
         * @summary 网络类型值。
         */
        networkType: `${ENetworkType}`;
      }) => void,
    ): void;
    /**
     * @summary 取消监听小程序要打开的页面不存在事件。
     */
    export function offPageNotFound(
      cb: (event: {
        /**
         * @summary 不存在页面的路径 (代码包路径)。
         */
        path: string;
        /**
         * @summary 打开不存在页面的 query 参数。
         */
        query: Record<string, any>;
        /**
         * @summary 是否本次启动的首个页面（例如从分享等入口进来，首个页面是开发者配置的分享页面）。
         */
        isEntryPage: boolean;
      }) => void,
    ): void;
    /**
     * @summary 取消监听 WebSocket 关闭事件。
     */
    export function offSocketClose(cb: (arg: { reason: string }) => void): void;
    /**
     * @summary 取消监听 WebSocket 错误。
     */
    export function offSocketError(cb: (arg: { errorMessage: string; error: number }) => void): void;
    /**
     * @summary 取消监听 WebSocket 接受到服务器的消息事件
     */
    export function offSocketMessage(
      cb: (arg: {
        /**
         * @summary 服务器返回的消息：普通的文本 string 或者经 base64 编码后的 string。
         */
        data: string | ArrayBuffer;
        /**
         * @summary 如果此字段值为 true，data 字段表示接收到的经过了 base64 编码后的 string，否则 data 字段表示接收到的普通 string 文本。
         */
        isBuffer: boolean;
      }) => void,
    ): void;
    /**
     * @summary 取消监听 WebSocket 连接打开事件
     */
    export function offSocketOpen(cb: () => void): void;
    export function offSpeechRecognizeError(
      cb: (arg: {
        error: number;
        /**
         * @summary 识别id。
         */
        speechId: string;
      }) => void,
    ): void;
    export function offSpeechRecognizeResult(
      cb: (arg: {
        /**
         * @summary 识别结果。
         */
        result: string;
        /**
         * @summary 识别id。
         */
        speechId: string;
        /**
         * @summary 是否识别结束。
         */
        isFinalResult: boolean;
        /**
         * @summary 识别过程中录制的音频。
         */
        tempAudioPath: string;
      }) => void,
    ): void;
    export function offTitleCloseClick(cb: () => void): void;
    export function offTitleMoreClick(cb: () => void): void;
    /**
     * @summary 是取消监听 unhandledrejection 事件的 API
     */
    export function offUnhandledRejection(
      cb: (event: {
        /**
         * @summary reject() 的接收值，一般是 error 对象
         */
        reason: Error | unknown;
        /**
         * @summary 被 reject 的 Promise 对象
         */
        promise: Promise<unknown>;
      }) => void,
    ): void;
    /**
     * @summary 取消监听截屏事件。
     */
    export function offUserCaptureScreen(cb: () => void): void;
    export function offWifiConnected(
      cb: (arg: {
        /**
         * @summary Wifi 信息。
         */
        wifi: IWifiInfo;
      }) => void,
    ): void;
    /**
     * @summary 监听加速度数据
     * @description 回调间隔为 500ms，接口调用后会自动开始监听，可使用 [my.offAccelerometerChange]() 停止监听。
     */
    export function onAccelerometerChange(
      cb: (arg: {
        /**
         * @summary x 轴。
         */
        x: number;
        /**
         * @summary y 轴。
         */
        y: number;
        /**
         * @summary z 轴。
         */
        z: number;
        timestamp: number;
      }) => void,
    ): void;
    /**
     * @summary 监听小程序切后台事件，与 `App.onHide` 一致。
     * @description
     * 该事件与框架 app.js 注册小程序 时 onHide 参数的回调时机一致。对应的取消监听 API 请参见 [my.offAppHide]()。
     * 请勿使用 API 监听匿名函数，否则将无法关闭监听
     */
    export function onAppHide(cb: () => void): void;
    /**
     * @summary 监听小程序切前台事件，与 `App.onShow` 一致。
     * @description
     * 该事件与框架 app.js 注册小程序 时 onShow 参数的回调时机一致。对应的取消监听 API 请参见 my.offAppShow。
     * 请勿使用 API 监听匿名函数，否则将无法关闭监听。
     */
    export function onAppShow(cb: () => void): void;
    /**
     * @summary 监听音频因为系统占用而被中断的开始事件
     */
    export function onAudioInterruptionBegin(cb: () => void): void;
    export function onAudioInterruptionEnd(cb: () => void): void;
    /**
     * @summary 监听低功耗蓝牙设备的特征值变化的事件。
     */
    export function onBLECharacteristicValueChange(
      cb: (arg: {
        /**
         * @summary 蓝牙设备 ID。
         */
        deviceId: string;
        serviceId: string;
        characteristicId: string;
        value: string;
      }) => void,
    ): void;
    /**
     * @summary 监听低功耗蓝牙连接的错误事件，包括设备丢失，连接异常断开等
     */
    export function onBLEConnectionStateChanged(
      cb: (arg: {
        /**
         * @summary 蓝牙设备 ID。
         */
        deviceId: string;
        /**
         * @summary 连接目前的状态。
         */
        connected: boolean;
      }) => void,
    ): void;
    export function onBackgroundAudioPause(
      cb: (arg: {
        /**
         * - -1: Error
         * - 0: Paused
         * - 1: Playing/Ready
         * - 2: Unknown
         * - 3: Loading
         */
        status: number;
        currentPosition: number;
        duration: number;
        downloadPercent: number;
        audioDataUrl: string;
        bizExtraParamsJsonObj?: unknown;
      }) => void,
    ): void;
    export function onBackgroundAudioPlay(
      cb: (arg: {
        /**
         * - -1: Error
         * - 0: Paused
         * - 1: Playing/Ready
         * - 2: Unknown
         * - 3: Loading
         */
        status: number;
        currentPosition: number;
        duration: number;
        downloadPercent: number;
        audioDataUrl: string;
        bizExtraParamsJsonObj?: unknown;
      }) => void,
    ): void;
    export function onBackgroundAudioStop(
      cb: (arg: {
        /**
         * - -1: Error
         * - 0: Paused
         * - 1: Playing/Ready
         * - 2: Unknown
         * - 3: Loading
         */
        status: number;
        currentPosition: number;
        duration: number;
        downloadPercent: number;
        audioDataUrl: string;
        bizExtraParamsJsonObj?: unknown;
      }) => void,
    ): void;
    /**
     * @summary 监听 iBeacon 服务的状态变化。
     */
    export function onBeaconServiceChange(
      cb: (arg: {
        /**
         * @summary 服务目前是否可用。
         */
        available: boolean;
        /**
         * @summary 目前是否处于搜索状态。
         */
        discovering: boolean;
      }) => void,
    ): void;
    /**
     * @summary 监听 iBeacon 设备的更新事件。
     */
    export function onBeaconUpdate(
      cb: (arg: {
        /**
         * @summary 当前搜寻到的所有 iBeacon 设备列表。
         */
        beacons: IBeaconDevice[];
      }) => void,
    ): void;
    /**
     * @summary 监听本机蓝牙状态变化的事件。
     */
    export function onBluetoothAdapterStateChange(
      cb: (arg: {
        /**
         * @summary 蓝牙模块是否可用。
         */
        available: boolean | 'true' | 'false';
        /**
         * @summary 蓝牙模块是否处于搜索状态。
         */
        discovering: boolean;
      }) => void,
    ): void;
    /**
     * @summary 搜索到新的蓝牙设备时触发此事件。
     */
    export function onBluetoothDeviceFound(
      cb: (arg: {
        /**
         * @summary 新搜索到的设备列表。
         */
        devices: IBluetoothDevice[];
      }) => void,
    ): void;
    export function onCharacteristicDidSubscribe(
      cb: (arg: {
        /**
         * @summary 特征值 Id。
         */
        charcateristicId: number;
        /**
         * @summary 服务 Id。
         */
        serviceId: number;
        /**
         * @summary 连接设备 Id。
         */
        deviceId: string;
      }) => void,
    ): void;
    export function onCharacteristicDidUnsubscribe(
      cb: (arg: {
        /**
         * @summary 特征值 Id。
         */
        charcateristicId: number;
        /**
         * @summary 服务 Id。
         */
        serviceId: number;
        /**
         * @summary 连接设备 Id。
         */
        deviceId: string;
      }) => void,
    ): void;
    export function onCharacteristicRead(
      cb: (arg: {
        /**
         * @summary 特征值 Id。
         */
        charcateristicId: number;
        /**
         * @summary 服务 Id。
         */
        serviceId: number;
        /**
         * @summary 连接设备 Id。
         */
        deviceId: string;
        data: string;
      }) => void,
    ): void;
    export function onCharacteristicWrite(
      cb: (arg: {
        /**
         * @summary 特征值 Id。
         */
        charcateristicId: number;
        /**
         * @summary 服务 Id。
         */
        serviceId: number;
        /**
         * @summary 连接设备 Id。
         */
        deviceId: string;
        data: string;
      }) => void,
    ): void;
    /**
     * @summary 监听罗盘数据变化事件
     */
    export function onCompassChange(
      cb: (arg: {
        /**
         * @summary 面对的方向与正北方向的度数，值的范围为 `[0, 360)`。
         */
        direction: number;
      }) => void,
    ): void;
    /**
     * @summary 用于取消监听小程序自定义组件内部 JS 代码的 error 事件
     * @description 当自定义组件内部 JS 代码运行抛出错误时，除了会执行 [my.onError]() 回调外，同时会触发 [my.onComponentError]() 回调。
     */
    export function onComponentError(
      cb: /**
       * @param error 异常对象
       * @param method 异常发生所在的自定义组件方法
       * @param componentInstance 异常发生所在的自定义组件实例
       */
      (error: Error, method: string, componentInstance: object) => void,
    ): void;
    /**
     * @summary 监听持续定位信息。
     */
    export function onContinuousLocation(
      cb: (arg: {
        /**
         * @summary 纬度。
         */
        latitude: number;
        /**
         * @summary 经度。
         */
        longitude: number;
        /**
         * @summary 精确度，单位 m。
         */
        accurary: number;
      }) => void,
    ): void;
    export function onDecibelChange(cb: (arg: { decibel: number }) => void): void;
    export function onDeviceConnected(
      cb: (arg: {
        /**
         * @summary 连接设备 Id。
         */
        deviceId: string;
      }) => void,
    ): void;
    export function onDeviceDisconnected(
      cb: (arg: {
        /**
         * @summary 连接设备 Id。
         */
        deviceId: string;
      }) => void,
    ): void;
    export function onDeviceMotionChange(
      cb: (arg: {
        /**
         * @summary 当手机坐标 X/Y 和 地球 X/Y 重合时，绕着 Z 轴转动的夹角为 `alpha`。
         * - 值的范围为 `[0, 2*PI)`。
         * - 逆时针转动为正。
         */
        alpha: number;
        /**
         * @summary 当手机坐标 Y/Z 和地球 Y/Z 重合时，绕着 X 轴转动的夹角为 `beta`。
         * - 值的范围为 `[-1*PI, PI)`。
         * - 顶部朝着地球表面转动为正，也有可能朝着用户为正。
         */
        beta: number;
        /**
         * @summary 当手机 X/Z 和地球 X/Z 重合时，绕着 Y 轴转动的夹角为 `gamma`。
         * - 值的范围为 `[-1*PI/2, PI/2)`。
         * - 右边朝着地球表面转动为正。
         */
        gamma: number;
      }) => void,
    ): void;
    /**
     * @summary 是监听小程序错误事件的 API。
     * @description
     * 目前仅指 JS 执行错误。触发时机和参数与 App.onError 的一致。
     * 使用 my.onError 监听到的报错，app.js 中的 onError 方法也会监听到。
     * 使用 my.onError 监听页面报错，如果在多个页面开启监听没有关闭，则页面报错时会触发多个监听事件，建议在页面关闭时调用 my.offError 关闭监听。
     */
    export function onError(
      cb: /**
       * @param message 异常信息
       * @param stack 异常堆栈
       */
      (message: string, stack: string) => void,
    ): void;
    /**
     * @summary 监听添加/取消收藏事件。
     */
    export function onFavorite(
      cb: (arg: {
        /**
         * @summary 触发事件的行为是否成功，`true` 为成功，`false` 为失败。
         */
        success: boolean;
        /**
         * @summary 触发事件的行为，目前就添加收藏和取消收藏两种行为。
         */
        action: 'addToFavorite' | 'removeFromFavorite';
      }) => void,
    ): void;
    export function onGetWifiList(
      cb: (arg: {
        /**
         * @summary Wifi 列表数据。
         */
        wifiList: IWifiInfo[];
      }) => void,
    ): void;
    /**
     * @summary 监听陀螺仪数据变化事件
     */
    export function onGyroscopeChange(
      cb: (arg: {
        /**
         * @summary x 轴方向角速度。
         */
        x: number;
        /**
         * @summary y 轴方向角速度。
         */
        y: number;
        /**
         * @summary z 轴方向角速度。
         */
        z: number;
        timestamp: number;
      }) => void,
    ): void;
    export function onHCEMessage(
      cb: (arg: {
        /**
         * @summary 消息类型。
         * 有效值：
         * - `1` 消息为 HCE Apdu Command 类型，小程序需对此指令进行处理，并调用 `sendHCEMessage` 接口返回处理指令。
         * - `2` 消息为设备离场事件。
         */
        messageType: number;
        /**
         * @summary 客户端接收到 NFC 设备的指令，此参数当且仅当 `messageType=1` 时有效。
         */
        data?: ArrayBuffer;
        /**
         * @summary 此参数当且仅当 `messageType=2` 时有效。
         */
        reason?: string;
      }) => void,
    ): void;
    /**
     * @summary 小程序添加收藏、取消收藏的结果监听。开发者可以通过此接口进行添加监听，小程序保活期间可以收到通知，但是保活的小程序接收到通知后由于不在主线程，不建议接收到通知后进行UI操作。
     */
    export function onInternalFavorite(
      cb: (arg: {
        /**
         * @summary 触发事件的行为是否成功，`true` 为成功，`false` 为失败。
         */
        success: boolean;
        /**
         * @summary 触发事件的行为，目前就添加收藏和取消收藏两种行为。
         */
        action: 'addToFavorite' | 'removeFromFavorite';
      }) => void,
    ): void;
    export function onIotNotify(
      cb: (arg: {
        /**
         * @summary 业务类型，目前只有一个值：`sync`
         */
        bizType: string;
        /**
         * @summary 消息内容。
         * - 如果 bizType 为 sync，消息体见 https://yuque.antfin-inc.com/books/share/45b293db-e20a-41f9-a2d7-b0bd959d18ac/ku95pw#DSSYc
         */
        data: string;
      }) => void,
    ): void;
    export function onIotRawMessage(
      cb: (arg: {
        /**
         * @summary 厂商推送的原始消息
         */
        rawMessage: string;
      }) => void,
    ): void;
    export function onLocalServiceDiscoveryStop(cb: () => void): void;
    export function onLocalServiceFound(
      cb: (arg: {
        /**
         * @summary 服务类型。
         */
        serviceType: string;
        /**
         * @summary 服务名称。
         */
        serviceName: string;
        /**
         * @summary 服务的端口。
         */
        port: number;
        /**
         * @summary 服务的 ip 地址。
         */
        ip: string;
      }) => void,
    ): void;
    export function onLocalServiceLost(
      cb: (arg: {
        /**
         * @summary 服务类型。
         */
        serviceType: string;
        /**
         * @summary 服务名称。
         */
        serviceName: string;
      }) => void,
    ): void;
    export function onLocalServiceResolveFail(
      cb: (arg: {
        /**
         * @summary 服务类型。
         */
        serviceType: string;
        /**
         * @summary 服务名称。
         */
        serviceName: string;
      }) => void,
    ): void;
    /**
     * @summary 监听该页面地理位置定位完的回调，只针对 `chooseCity` 中属性 `setLocatedCity` 为 `true` 的情况。
     */
    export function onLocatedComplete(
      cb: (arg: {
        /**
         * @summary 当前定位城市经度。
         */
        longitude: number;
        /**
         * @summary 当前定位城市经度。
         */
        latitude: number;
        /**
         * @summary 当前定位城市 id，setLocatedCity 的时候带上。
         */
        locatedCityId: string;
      }) => void,
    ): void;
    /**
     * @summary 开始监听设备是否进入低电量模式。
     */
    export function onLowPowerWarning(
      cb: (arg: {
        /**
         * @summary 设备是否是低电量模式。
         */
        isLowPowerMode: boolean;
      }) => void,
    ): void;
    /**
     * @summary 开始监听内存不足的告警事件
     */
    export function onMemoryWarning(
      cb: (arg: {
        /**
         * @summary 系统内存的告警等级
         * @description
         * - 仅 Android 返回，iOS 不返回，需要兼容判断
         * @ios false
         */
        level?: EMemoryWarningLevel;
      }) => void,
    ): void;
    /**
     * @summary 开始监听网络状态变化。
     */
    export function onNetworkStatusChange(
      cb: (arg: {
        /**
         * @summary 网络是否可用。
         */
        isConnected: boolean;
        /**
         * @summary 网络类型值。
         */
        networkType: `${ENetworkType}`;
      }) => void,
    ): void;
    /**
     * @summary 监听小程序要打开的页面不存在事件。
     * @description
     * 该事件与 `App.onPageNotFound` 的回调时机一致。
     * 开发者可以在回调中进行页面重定向，但必须在回调中同步处理，异步处理（例如 setTimeout 异步执行）无效。
     * 若开发者没有调用 my.onPageNotFound 绑定监听，也没有声明 App.onPageNotFound，当跳转页面不存在时，将推入页面不存在提示页面。
     * 如果回调中又重定向到另一个不存在的页面，将推入页面不存在提示页面，并且不再第二次回调。
     * 仅响应小程序冷启动或热启动时的页面找不到事件，不支持处理 路由 API 的失败场景。
     */
    export function onPageNotFound(
      cb: (event: {
        /**
         * @summary 不存在页面的路径 (代码包路径)。
         */
        path: string;
        /**
         * @summary 打开不存在页面的 query 参数。
         */
        query: Record<string, any>;
        /**
         * @summary 是否本次启动的首个页面
         * @description 例如从分享等入口进来，首个页面是开发者配置的分享页面
         */
        isEntryPage: boolean;
      }) => void,
    ): void;
    /**
     * @summary 监听WebSocket关闭。
     */
    export function onSocketClose(cb: (arg: { reason: string }) => void): void;
    /**
     * @summary 监听WebSocket错误。
     */
    export function onSocketError(cb: (arg: { errorMessage: string; error: number }) => void): void;
    /**
     * @summary 监听 WebSocket 接受到服务器的消息事件。
     */
    export function onSocketMessage(
      cb: (arg: {
        /**
         * @summary 服务器返回的消息：普通的文本 string 或者经 base64 编码后的 string。
         */
        data: string | ArrayBuffer;
        /**
         * @summary 如果此字段值为 true，data 字段表示接收到的经过了 base64 编码后的 string，否则 data 字段表示接收到的普通 string 文本。
         */
        isBuffer: boolean;
      }) => void,
    ): void;
    /**
     * @summary 监听 WebSocket 连接打开事件。
     */
    export function onSocketOpen(cb: () => void): void;
    export function onSpeechRecognizeError(
      cb: (arg: {
        error: number;
        /**
         * @summary 识别id。
         */
        speechId: string;
      }) => void,
    ): void;
    export function onSpeechRecognizeResult(
      cb: (arg: {
        /**
         * @summary 识别结果。
         */
        result: string;
        /**
         * @summary 识别id。
         */
        speechId: string;
        /**
         * @summary 是否识别结束。
         */
        isFinalResult: boolean;
        /**
         * @summary 识别过程中录制的音频。
         */
        tempAudioPath: string;
      }) => void,
    ): void;
    export function onTitleCloseClick(cb: () => void): void;
    export function onTitleMoreClick(cb: () => void): void;
    /**
     * @summary 监听未处理的 Promise 拒绝事件（即 `unhandledrejection` 事件）的 API
     * @description 当 Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件，该事件的回调时机和参数与 App.onUnhandledRejection 的一致。
     */
    export function onUnhandledRejection(
      cb: (event: {
        /**
         * @summary reject() 的接收值，一般是 error 对象
         */
        reason: Error | unknown;
        /**
         * @summary 被 reject 的 Promise 对象
         */
        promise: Promise<unknown>;
      }) => void,
    ): void;
    /**
     * @summary 用于监听用户发起的主动截屏事件
     */
    export function onUserCaptureScreen(cb: () => void): void;
    export function onWifiConnected(
      cb: (arg: {
        /**
         * @summary Wifi 信息。
         */
        wifi: IWifiInfo;
      }) => void,
    ): void;
    export function openBLEPeripheral(r: {
      deviceName?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { isSupportPeripheral: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              isSupportPeripheral: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      isSupportPeripheral: boolean;
    }>;
    /**
     * @summary 初始化小程序蓝牙模块
     */
    export function openBluetoothAdapter(r: {
      autoClose?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { isSupportBLE: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              isSupportBLE: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      isSupportBLE: boolean;
    }>;
    /**
     * @summary 在新页面打开文件预览，暂时只支持预览 PDF 格式文件。
     */
    export function openDocument(r: {
      filePath: string;
      fileType?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 使用支付宝内置地图查看位置。
     * - 暂无境外地图数据，在中国内地（不含港澳台）以外的地区可能无法正常调用此 API。
     * - 仅支持高德地图 style 与火星坐标系。
     */
    export function openLocation(r: {
      /**
       * @summary 经度。
       */
      longitude: string;
      /**
       * @summary 纬度。
       */
      latitude: string;
      /**
       * @summary 位置名称。
       */
      name: string;
      /**
       * @summary 地址的详细说明。
       */
      address: string;
      /**
       * @summary 缩放比例，范围 3~19。
       * @default 15
       */
      scale?: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openRpc(r: {
      protocolParams?: unknown;
      protocols?: Record<string, unknown>;
      operationType: string;
      requestData: unknown[];
      headers?: Record<string, string>;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { [x: string]: any; [x: number]: any; [x: symbol]: any }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              [x: string]: any;
              [x: number]: any;
              [x: symbol]: any;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      [x: string]: any;
      [x: number]: any;
      [x: symbol]: any;
    }>;
    /**
     * @summary 类似于 safari 原生 select 的组件，但是功能更加强大，一般用来替代 select，或者 2 级数据的选择
     */
    export function optionsSelect(r: {
      title?: string;
      optionsOne: string[];
      optionsTwo?: string[];
      selectedOneIndex?: number;
      selectedTwoIndex?: number;
      positiveString?: string;
      negativeString?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { selectedOneIndex: number; selectedTwoIndex?: number; selectedOneOption: string; selectedTwoOption?: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              selectedOneIndex: number;
              selectedTwoIndex?: number;
              selectedOneOption: string;
              selectedTwoOption?: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      selectedOneIndex: number;
      selectedTwoIndex?: number;
      selectedOneOption: string;
      selectedTwoOption?: string;
    }>;
    /**
     * @summary 滚动到页面的目标位置。
     */
    export function pageScrollTo(r: {
      scrollTop?: number;
      selector?: string;
      /**
       * @default 0
       */
      duration?: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function pauseBackgroundAudio(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function pauseVoice(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function playBackgroundAudio(r: {
      /**
       * @summary 音乐链接地址。
       */
      url: string;
      /**
       * @summary 音乐标题。
       */
      title?: string;
      /**
       * @summary 演唱者。
       */
      singer?: string;
      /**
       * @summary 音乐描述。
       */
      describe?: string;
      /**
       * @summary logo URL。
       */
      logo?: string;
      /**
       * @summary 封面 URL。
       */
      cover?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function playVoice(r: {
      /**
       * @summary 音频文件路径，只能来源自 `startRecord` 的录音文件路径。
       */
      filePath: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { error: 0 }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              error: 0;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      error: 0;
    }>;
    export function preloadCanvasImage(r: {
      urls: string[];
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 加载失败的图片
         */
        failed: {
          [url: string]: IPreloadCanvasImageLoadData;
        };
        /**
         * @summary 加载成功的图片
         */
        loaded: {
          [url: string]: IPreloadCanvasImageLoadData;
        };
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 加载失败的图片
               */
              failed: {
                [url: string]: IPreloadCanvasImageLoadData;
              };
              /**
               * @summary 加载成功的图片
               */
              loaded: {
                [url: string]: IPreloadCanvasImageLoadData;
              };
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 加载失败的图片
       */
      failed: {
        [url: string]: IPreloadCanvasImageLoadData;
      };
      /**
       * @summary 加载成功的图片
       */
      loaded: {
        [url: string]: IPreloadCanvasImageLoadData;
      };
    }>;
    export function preloadVideo(r: {
      src: string;
      definition?: number;
      'extra-info'?: Record<string, string>;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 预览图片。不支持本地图片路径。
     */
    export function previewImage(r: {
      /**
       * @summary 照片支持长按下载。
       */
      enablesavephoto?: boolean;
      /**
       * @summary 是否在右下角显示下载入口。
       */
      enableShowPhotoDownload?: boolean;
      /**
       * @summary 要预览的图片 HTTP 链接列表。支持网络 url，apfilePath。
       */
      urls: string[];
      /**
       * @summary 当前显示图片索引。
       * @default 0
       */
      current?: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 弹出一个对话框，让用户在对话框内输入文本。
     */
    export function prompt(r: {
      /**
       * @summary 提示框的标题
       */
      title: string;
      /**
       * @summary 提示框的显示内容
       * @default "请输入内容"
       */
      message?: string;
      /**
       * @summary 提示框的显示内容的对齐方式
       * @default "left"
       */
      align?: 'left' | 'center' | 'right';
      /**
       * @summary 输入框
       */
      placeholder?: string;
      /**
       * @summary "确认" 按钮颜色，HEX 格式
       */
      confirmColor?: string;
      /**
       * @summary "取消" 按钮颜色，HEX 格式
       */
      cancelColor?: string;
      /**
       * @summary 确认按钮文字
       * @default "确定"
       */
      okButtonText?: string;
      /**
       * @summary 取消按钮文字
       * @default "取消"
       */
      cancelButtonText?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 通过经纬度，获取逆地理信息。
     */
    export function reGeoCode(r: {
      latitude: number;
      longitude: number;
      bizType: string;
      regeoLevel?: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        city: string;
        country: string;
        countryCode: string;
        province: string;
        provinceAdcode: string;
        cityAdcode: string;
        district: string;
        districtAdcode: string;
        streetNumber: {
          /**
           * @summary 街道 number。
           */
          number: string;
          /**
           * @summary 街道名称。
           */
          street: string;
        };
        pois: Array<{
          /**
           * @summary poi名称。
           */
          number: string;
          /**
           * @summary poi地址。
           */
          address: string;
        }>;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              city: string;
              country: string;
              countryCode: string;
              province: string;
              provinceAdcode: string;
              cityAdcode: string;
              district: string;
              districtAdcode: string;
              streetNumber: {
                /**
                 * @summary 街道 number。
                 */
                number: string;
                /**
                 * @summary 街道名称。
                 */
                street: string;
              };
              pois: Array<{
                /**
                 * @summary poi名称。
                 */
                number: string;
                /**
                 * @summary poi地址。
                 */
                address: string;
              }>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      city: string;
      country: string;
      countryCode: string;
      province: string;
      provinceAdcode: string;
      cityAdcode: string;
      district: string;
      districtAdcode: string;
      streetNumber: {
        /**
         * @summary 街道 number。
         */
        number: string;
        /**
         * @summary 街道名称。
         */
        street: string;
      };
      pois: Array<{
        /**
         * @summary poi名称。
         */
        number: string;
        /**
         * @summary poi地址。
         */
        address: string;
      }>;
    }>;
    /**
     * @summary 关闭当前所有页面，并重新打开应用内的某个指定页面
     */
    export function reLaunch(r: {
      /**
       * @summary 需要跳转的目标页面路径
       * @description
       * 目标路径如果是 Tab 路径后不可以带参数
       * 目标路径如果是非 Tab 页，可以携带参数，路径与参数之间使用 `?` 分隔，参数键与参数值用 `=` 相连，不同参数必须用 `&` 分隔
       * @example page/tab/index
       */
      url: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 读取低功耗蓝牙设备特征值中的数据
     */
    export function readBLECharacteristicValue(r: {
      serviceId: string;
      deviceId: string;
      characteristicId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { characteristic: IBLECharacteristic }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              characteristic: IBLECharacteristic;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      characteristic: IBLECharacteristic;
    }>;
    /**
     * @summary 关闭当前页面，跳转到应用内的某个指定页面
     */
    export function redirectTo(r: {
      /**
       * @summary 需要跳转的目标页面路径
       * 路径后可以带参数, 目标路径必须为应用内非 tabbar 的，路径与参数之间使用 ?分隔，参数键与参数值用=相连，不同参数必须用&分隔
       * @example page/index/index?key1=value1&key2=value2
       */
      url: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 多级省市区选择器，自带省市区数据源。
     */
    export function regionPicker(r: {
      title?: string;
      customItem?: string;
      mergeOptions?: {
        /**
         * @summary 删除城市信息。
         */
        remove: IRemoveOption[];
        /**
         * @summary 添加城市信息。
         */
        add: IAddOption[];
        /**
         * @summary 更新城市信息。
         */
        update: IUpdateOption[];
      };
      selectedItem?: string[];
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { data: string[] }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              data: string[];
            }
          | IFailResult,
      ): void;
    }): Promise<{
      data: string[];
    }>;
    export function registerSSID(r: {
      SSID: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function removeBackgroundImage(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 将当前小程序从收藏中移除。
     */
    export function removeFromFavorite(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 取消收藏是否成功，`true` 为添加收藏成功，`false` 为添加收藏失败。
         */
        success: boolean;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 取消收藏是否成功，`true` 为添加收藏成功，`false` 为添加收藏失败。
               */
              success: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 取消收藏是否成功，`true` 为添加收藏成功，`false` 为添加收藏失败。
       */
      success: boolean;
    }>;
    export function removePeripheralService(r: {
      serviceId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 删除某个保存的文件。
     */
    export function removeSavedFile(r: {
      apFilePath?: string;
      filePath?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 删除缓存数据的异步接口
     */
    export function removeStorage(r: {
      type: 'user';
      key: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { error: 0; success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              error: 0;
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      error: 0;
      success: true;
    }>;
    /**
     * @summary 删除缓存数据的同步接口。
     */
    export function removeStorageSync(r: { type: 'user'; key: string }): {
      error: 0;
      success: true;
    };
    /**
     * @summary 移除 Tab 页某一项右上角的文本。
     */
    export function removeTabBarBadge(r: {
      /**
       * @summary 标签页的项数序号，从左边开始计数。
       */
      index: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function removeTabBarItem(r: {
      index: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { pagePath: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              pagePath: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      pagePath: string;
    }>;
    export function replyRoomInvitation(r: {
      uid: string;
      params: {
        inviter: string;
        roomId: string;
      };
      replyType: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 自定义分析数据的上报接口，使用前需要在 [小程序开发者中心控制台](https://openhome.alipay.com/) > 小程序详情页 > 数据中心 > 自定义分析 > 事件 中新建事件，并配置事件名和字段。
     */
    export function reportAnalytics(eventName: string, data: Record<string, unknown>): void;
    /**
     * @summary 手动上报首屏时间
     * @deprecated
     */
    export function reportBizReady(r: {
      /**
       * @summary 可用时间戳。
       */
      availableTime: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 上报自定义的 Error 到雨燕（错误码为 14）。
     */
    export function reportCustomError(error: Error | void): void;
    /**
     * @summary 小程序事件埋点。事件管理相关请见 [此处](https://log.alipay.com/index_v3.htm#/manage/eventmanage/eventmanagement)
     */
    export function reportCustomEvent(
      eventId: string,
      extData: {
        bizType?: string;
        /**
         * @summary 上报日志级别，仅支持 1 | 2 | 3
         * - 1：日志等级 High
         * - 2：日志等级 normal（默认值）
         * - 3：日志等级 low
         * @default 2
         */
        logLevel?: 1 | 2 | 3;
        antLogCategory?: string;
      },
    ): void;
    export function reportIotEvent(r: {
      data: Record<string, string>;
      eventId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function reportSnapshot(config: { available: boolean }): void;
    export function request(r: {
      /**
       * @summary 目标服务器 URL
       * @description
       * - 目前只支持 HTTPS 协议的请求
       * - 目前只支持与 *域名白名单* 中的域名通讯
       *   - 开发过程中，可通过开发者工具 **详情 > 域名信息 > 忽略 httpRequest 域名合法性检查** 忽略该限制（模拟器、预览以及真机调试场景不会校验域名合法性）
       *   - 正式/体验版本必须在 **支付宝小程序管理中心 > 小程序详情 > 设置 > 开发设置 > 服务器域名白名单** 中配置
       *   - 域名添加或删除后仅对新版本生效，老版本仍使用修改前的域名配置
       */
      url: string;
      /**
       * @summary 返回的数据格式
       * @default 'json'
       */
      dataType?: 'text' | 'json' | 'base64' | 'arraybuffer';
      /**
       * @summary HTTP 请求方法
       * @default 'GET'
       */
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      /**
       * @summary 传给服务器的数据
       * @description
       * 传给服务器的数据最终会是 string 类型，如果 data 不是 string 类型，会被转换成 string 。转换规则如下：
       * - 若方法为 `GET`，会将数据转换成 querystring 形式： `encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...`
       * - 若方法为 `POST` 且 `headers['content-type']` 为 `application/json` ，会对数据进行 JSON 序列化。
       * - 若方法为 `POST` 且 `headers['content-type']` 为 `application/x-www-form-urlencoded` ，会将数据转换成 querystring形式： `encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...`
       */
      data?: string | Record<string, string> | ArrayBuffer;
      /**
       * @summary 设置请求的 HTTP 头对象
       * @description
       * - "content-type" 字段默认为 `application/json`
       * - `referer` 字段不可设置，其格式固定为 https://{appid}.hybrid.alipay-eco.com/{appid}/{version}/index.html#{page}，其中 {appid} 为小程序的 APPID，{version} 为小程序发布标识，{page} 为小程序当前页面。
       */
      headers?: Record<string, string>;
      /**
       * @summary 超时时间，单位 ms
       * @default 30000
       */
      timeout?: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 响应数据，格式取决于请求时的 `dataType` 参数
         */
        data: string | Record<string, unknown> | ArrayBuffer;
        /**
         * @summary HTTP 响应码。
         */
        status: number;
        /**
         * @summary HTTP 响应头。
         */
        headers: Record<string, string>;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 响应数据，格式取决于请求时的 `dataType` 参数
               */
              data: string | Record<string, unknown> | ArrayBuffer;
              /**
               * @summary HTTP 响应码。
               */
              status: number;
              /**
               * @summary HTTP 响应头。
               */
              headers: Record<string, string>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 响应数据，格式取决于请求时的 `dataType` 参数
       */
      data: string | Record<string, unknown> | ArrayBuffer;
      /**
       * @summary HTTP 响应码。
       */
      status: number;
      /**
       * @summary HTTP 响应头。
       */
      headers: Record<string, string>;
    }>;
    export function resumeVoice(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function rpc(r: {
      timeout?: number;
      operationType: string;
      requestData: unknown[];
      headers?: Record<string, string>;
      gateway?: string;
      compress?: boolean;
      disableLimitView?: boolean;
      getResponse?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { [x: string]: any; [x: number]: any; [x: symbol]: any }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              [x: string]: any;
              [x: number]: any;
              [x: symbol]: any;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      [x: string]: any;
      [x: number]: any;
      [x: symbol]: any;
    }>;
    /**
     * @summary 非对称加密。
     */
    export function rsa(r: {
      text: string;
      key: string;
      action: 'encrypt' | 'decrypt';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { text: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              text: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      text: string;
    }>;
    /**
     * @summary 保存文件到本地
     */
    export function saveFile(r: {
      apFilePath: string;
      filePath: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 将在线图片保存至本地相册
     */
    export function saveImage(r: {
      /**
       * @summary 要保存的图片链接。
       */
      url: string;
      /**
       * @summary 是否显示图片操作菜单。
       * @default true
       */
      showActionSheet?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function saveImageToPhotosAlbum(r: {
      filePath: string;
      hideToast?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function saveSnapshot(): void;
    export function saveVideoToPhotosAlbum(r: {
      src?: string;
      filePath?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 调用扫一扫功能。
     */
    export function scan(r: {
      type: 'bar' | 'lottery' | 'qr';
      scanType?: Array<'qrCode' | 'barCode' | 'dmCode' | 'pdf417Code' | 'narrowCode' | 'hmCode'>;
      charset?: string;
      hideAlbum?: boolean;
      actionType?: 'scan' | 'route' | 'scanAndRoute' | 'scanAndRpc';
      qrcode?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function seNFCServiceIsv(r: {
      param?: string;
      method: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { resultCode: string; data: string; resultMsg: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              resultCode: string;
              data: string;
              resultMsg: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      resultCode: string;
      data: string;
      resultMsg: string;
    }>;
    export function seekBackgroundAudio(r: {
      position: number;
      business: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function sendHCEMessage(r: {
      data: ArrayBuffer;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { errMsg: number; errCode: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              errMsg: number;
              errCode: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      errMsg: number;
      errCode: number;
    }>;
    export function sendLanHttpRequest(r: {
      url: string;
      data?: unknown;
      timeout?: number;
      headers?: Record<string, unknown>;
      method?: 'GET' | 'POST';
      dataType?: 'JSON' | 'text';
      bindToWifi?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { data: string | Record<string, unknown>; headers: Record<string, unknown>; status: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              data: string | Record<string, unknown>;
              headers: Record<string, unknown>;
              status: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      data: string | Record<string, unknown>;
      headers: Record<string, unknown>;
      status: number;
    }>;
    export function sendMtop(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function sendSMS(r: {
      content: string;
      mobile: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 通过socket发送数据
     */
    export function sendSocketMessage(r: {
      socketTaskID: number;
      data: string;
      isBuffer?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function setBLEMTU(r: {
      deviceId: string;
      mtu: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true; mtu: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
              mtu: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
      mtu: number;
    }>;
    export function setBackButton(r: {
      color: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 设置窗口背景颜色
     */
    export function setBackgroundColor(r: {
      backgroundColor?: string;
      kBackgroundColorTop?: string;
      kBackgroundColorBottom?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function setBackgroundImage(r: {
      color?: number;
      imgUrl: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 动态设置下拉 loading 页面的文字颜色。
     */
    export function setBackgroundTextStyle(r: {
      textStyle: 'dark' | 'light';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 设置页面是否支持下拉
     */
    export function setCanPullDown(r: {
      canPullDown: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 设置剪贴板数据。
     */
    export function setClipboard(r: {
      text: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function setCustomPopMenu(r: {
      menus: ICustomMenuItem[];
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 设置是否保持屏幕长亮状态
     */
    export function setKeepScreenOn(r: {
      keepScreenOn?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 用于修改 `chooseCity` 中的默认定位城市的名称。
     */
    export function setLocatedCity(r: {
      locatedCityName: string;
      locatedCityId: string;
      locatedCityAdCode?: string;
      locatedCityPinyin?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { locatedCityName: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              locatedCityName: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      locatedCityName: string;
    }>;
    /**
     * @summary 设置导航栏样式：导航栏标题、导航栏背景色、导航栏底部边框颜色、导航栏左上角 logo 图片。
     */
    export function setNavigationBar(r: {
      /**
       * @summary 导航栏标题。
       */
      title?: string;
      /**
       * @summary 图片链接地址
       * @description
       * 导航栏左上角 logo 图片支持 gif 格式，必须使用 HTTPS 图片链接
       * 若设置了 image 则 title 参数失效
       * 请使用 iOS @3x 分辨率标准的高清图片
       */
      image?: string;
      /**
       * @summary 导航栏背景色，支持十六进制颜色值。
       * @description 导航栏背景色不支持渐变色
       */
      backgroundColor?: string;
      /**
       * @summary 导航栏底部边框颜色，支持十六进制颜色值。
       * @description 若设置了 backgroundColor，则 borderBottomColor 不会生效，默认会和 backgroundColor 颜色一样。
       */
      borderBottomColor?: string;
      /**
       * @summary 是否重置导航栏为支付宝默认配色。
       * @default false
       */
      reset?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 配置 optionMenu 导航栏额外图标
     */
    export function setOptionMenu(r: {
      title?: string;
      bizType?: 'tiny';
      color?: string;
      menus?: IOptionMenu[];
      preventDefault?: true;
      reset?: true;
      override?: boolean;
      contentDesc?: string;
      redDot?: '-1' | '0' | string;
      icontype?: string;
      icon?: string;
      iconfont?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(
        data:
          | {
              success: true;
            }
          | {
              success: true;
            },
      ): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | (
              | {
                  success: true;
                }
              | {
                  success: true;
                }
            )
          | IFailResult,
      ): void;
    }): Promise<
      | {
          success: true;
        }
      | {
          success: true;
        }
    >;
    /**
     * @summary 配置 optionMenu 导航栏额外图标
     */
    export function setOptionMenu(r: {
      icon: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(
        data:
          | {
              success: true;
            }
          | {
              success: true;
            },
      ): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | (
              | {
                  success: true;
                }
              | {
                  success: true;
                }
            )
          | IFailResult,
      ): void;
    }): Promise<
      | {
          success: true;
        }
      | {
          success: true;
        }
    >;
    /**
     * @summary 设置屏幕亮度。
     */
    export function setScreenBrightness(r: {
      brightness: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function setScreenOrientation(r: {
      orientation: 'landscape' | 'portrait';
      beta: 1;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 将数据存储在本地缓存中指定的 key 中的异步接口
     */
    export function setStorage(r: {
      type: 'user';
      data: string;
      key: string;
      value: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 将数据存储在本地缓存中指定的 key 中的同步接口。
     */
    export function setStorageSync(r: { type: 'user'; data: string; key: string; value: string }): void;
    export function setTBSessionInfo(r: {
      sessionInfo: Record<string, unknown>;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 为 Tab 页某一项的右上角添加文本。
     */
    export function setTabBarBadge(r: {
      /**
       * @summary 标签页的项数序号，从左边开始计数。
       */
      index: number;
      /**
       * @summary 显示的文本，超过三个字符则显示 前两个字符 + “…”。例如：“支付宝” 显示 “支付宝”，“蚂蚁金服” 显示 “蚂蚁…”。
       */
      text: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 动态设置 Tab 页某一项的内容。
     */
    export function setTabBarItem(r: {
      /**
       * @summary 标签页的项数序号，从左边开始计数。
       */
      index: number;
      /**
       * @summary 标签页按钮上的文字。
       */
      text: string;
      /**
       * @summary 图片路径，建议尺寸为 81px * 81px，支持 png/jpeg/jpg/gif 图片格式，支持网络图片。
       */
      iconPath: string;
      /**
       * @summary 选中时的图片路径，建议尺寸为 81px * 81px，支持 png/jpeg/jpg/gif 图片格式，支持网络图片。
       */
      selectedIconPath: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 动态设置 Tab 页的整体样式，如文字颜色、标签背景色、标签边框颜色等。
     */
    export function setTabBarStyle(r: {
      /**
       * @summary 标签（tab）上的文字默认颜色。HEXcolor 格式，如 `#FF0000`
       */
      color: string;
      /**
       * @summary 标签（tab）上的文字选中时的颜色。HEXcolor 格式，如 `#00FF00`
       */
      selectedColor: string;
      /**
       * @summary 标签（tab）的背景色。HEXcolor 格式，如 `#0000FF`
       */
      backgroundColor: string;
      /**
       * @summary 标签页（tabbar）上边框的颜色（边框高度 1 px）。
       * - 支持传参如下：
       * - `black`，对应色值为 `#FFE5E5E5` 。
       * - `white`，对应色值为 `#FFFFFFFF` 。
       * - #开头的自定义的RGB色值，如 `#FFABABAE` 或 `#FFFFFF`。
       */
      borderStyle: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function setTransparentTitle(r: {
      transparentTitle: 'none' | 'auto' | 'always' | 'custom';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function setViewTop(r: {
      position: 'top' | 'bottom';
      animated?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function setVisualEffectOnCapture(r: {
      /**
       * @summary 截屏/录屏的表现
       */
      visualEffect: 'none' | 'hidden';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function setWifiList(r: {
      wifiList: IWifiInfo4SetWifiList[];
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 显示操作菜单。
     */
    export function showActionSheet(r: {
      /**
       * @summary 菜单标题
       */
      title?: string;
      /**
       * @summary （`iOS 特殊处理`）指定按钮的索引号，从 `0` 开始。使用场景：需要删除或清除数据等类似场景，默认为红色
       */
      destructiveBtnIndex?: number;
      /**
       * @summary 需飘红选项的数组
       */
      badges?: IShowActionSheetBadge[];
      /**
       * @summary 菜单按钮文字数组
       */
      items: string[];
      /**
       * @summary 取消按钮文案。注：`Android` 平台此字段无效，不会显示取消按钮
       * @default "取消"
       */
      cancelButtonText?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 返回用户传入的 `items` 内被选中的索引，从 `0` 开始, 取消选择时，返回 `-1`
         */
        index: number;
        success: true;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 返回用户传入的 `items` 内被选中的索引，从 `0` 开始, 取消选择时，返回 `-1`
               */
              index: number;
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 返回用户传入的 `items` 内被选中的索引，从 `0` 开始, 取消选择时，返回 `-1`
       */
      index: number;
      success: true;
    }>;
    /**
     * @summary 通过权限引导模块以图文等形式向用户弹出 Dialog，引导用户打开相应的权限
     * @description
     * - 权限引导的核心是引导而非权限判断，调用时机应该在业务方确认所需权限被限制的时候
     * - 权限引导弹框受疲劳度等因素控制
     */
    export function showAuthGuide(r: {
      /**
       * @summary 引导的权限标识，用于标识该权限类型(如 地理位置信息)。
       */
      authType: `${EAuthType}`;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function showAuthenticDialog(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { resultCode: string; resultMsg: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              resultCode: string;
              resultMsg: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      resultCode: string;
      resultMsg: string;
    }>;
    export function showBackToHomepage(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 显示加载提示的过渡效果，可与 my.hideLoading 配合使用。
     */
    export function showLoading(r: {
      /**
       * @summary 提示中的文字内容
       */
      content?: string;
      /**
       * @summary 延迟显示，单位为毫秒（ms）, 如果在此时间之前调用了 {@link #} 则不会显示。
       * @default 0
       */
      delay?: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 在当前页面显示导航条的加载动画。
     */
    export function showNavigationBarLoading(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 手动唤起分享面板。此时 `Page.onShareAppMessage` 入参中 `from` 的值为 `code`。
     */
    export function showSharePanel(): void;
    /**
     * @summary 显示标签页（tabbar）。
     */
    export function showTabBar(r: {
      /**
       * @summary 是否需要动画效果，默认为无动画效果。
       * @default false
       */
      animation?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 显示标签页（tabbar）某一项的右上角的红点。
     */
    export function showTabBarRedDot(r: {
      /**
       * @summary 标签页的项数序号，从左边开始计数。
       */
      index: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 显示一个弱提示，在到达设定的显示时间后，自动消失。
     */
    export function showToast(r: {
      content?: string;
      type?: 'none' | 'success' | 'fail' | 'exception' | 'loading';
      duration?: number;
      delay?: number;
      xOffset?: number;
      yOffset?: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function startAccelerometer(r: {
      /**
       * @default "normal"
       */
      interval?: 'game' | 'ui' | 'normal';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function startBLEAdvertising(r: {
      serviceId?: string;
      includeDeviceName?: boolean;
      advertiseServiceId?: boolean;
      manufacturerId?: number;
      manufacturerData?: string;
      powerLevel?: string;
      connectable?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 开始搜索附近的 iBeacon 设备。
     */
    export function startBeaconDiscovery(r: {
      uuids: string[];
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 开始搜寻附近的蓝牙外围设备
     */
    export function startBluetoothDevicesDiscovery(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function startCompass(r: {
      /**
       * @default "normal"
       */
      interval?: 'game' | 'ui' | 'normal';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 持续获取当前设备的经纬度信息。
     */
    export function startContinuousLocation(r: {
      bizType: string;
      isNeedSpeed?: boolean;
      callbackInterval?: number;
      locationMode?: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(
        data:
          | {
              success: true;
            }
          | {
              success: true;
            },
      ): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | (
              | {
                  success: true;
                }
              | {
                  success: true;
                }
            )
          | IFailResult,
      ): void;
    }): Promise<
      | {
          success: true;
        }
      | {
          success: true;
        }
    >;
    /**
     * @summary 持续获取当前设备的经纬度信息。
     */
    export function startContinuousLocation(r: {
      bizType: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(
        data:
          | {
              success: true;
            }
          | {
              success: true;
            },
      ): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | (
              | {
                  success: true;
                }
              | {
                  success: true;
                }
            )
          | IFailResult,
      ): void;
    }): Promise<
      | {
          success: true;
        }
      | {
          success: true;
        }
    >;
    export function startGyroscope(r: {
      /**
       * @default "normal"
       */
      interval?: 'game' | 'ui' | 'normal';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function startHCE(r: {
      aid_list: string[];
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { errMsg: number; errCode: number }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              errMsg: number;
              errCode: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      errMsg: number;
      errCode: number;
    }>;
    export function startLocalServiceDiscovery(r: {
      serviceType: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 从 `A` 主体小程序直接打开 `B` 主体小程序的 `b` 插件(1.0 小服务)。
     */
    export function startMiniService(r: {
      /**
       * @summary 已订购的插件id。
       */
      serviceId: string;
      sourceId: string;
      /**
       * @summary 需要传递给目标插件的数据，插件可在 `App.onLaunch(options)`，`App.onShow(options)` 中获取到这份数据。
       */
      extraData?: any;
      servicePage?: string;
      /**
       * @summary 当前插件的宿主id。
       */
      parentAppId?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: any): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: any | IFailResult): void;
    }): Promise<any>;
    /**
     * @summary 主动开启下拉刷新
     * @description
     * 调用 my.startPullDownRefresh 后触发下拉刷新动画，效果与用户手动下拉刷新一致（会触发 onPullDownRefresh 监听方法）。
     * 当处理完数据刷新后，my.stopPullDownRefresh 可停止当前页面的下拉刷新
     */
    export function startPullDownRefresh(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function startRecord(r: {
      /**
       * @summary 最大录制时长，单位秒。
       * @default 60
       */
      maxDuration?: number;
      /**
       * @summary 最小录制时长，单位秒。
       * @default 1
       */
      minDuration?: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 录音文件路径。
         */
        apFilePath: string;
        /**
         * @summary 录音时间长度，单位秒。
         */
        duration: number;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 录音文件路径。
               */
              apFilePath: string;
              /**
               * @summary 录音时间长度，单位秒。
               */
              duration: number;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 录音文件路径。
       */
      apFilePath: string;
      /**
       * @summary 录音时间长度，单位秒。
       */
      duration: number;
    }>;
    export function startSpeechRecognize(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function startWifi(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function stopAccelerometer(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function stopBLEAdvertising(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function stopBackgroundAudio(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 停止搜索附近的 iBeacon 设备。
     */
    export function stopBeaconDiscovery(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 停止搜寻附近的蓝牙外围设备。
     */
    export function stopBluetoothDevicesDiscovery(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function stopCompass(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 停止持续获取当前设备的经纬度信息。
     */
    export function stopContinuousLocation(r: {
      /**
       * @summary 业务方标识，要求能够唯一标识使用方的字符串。需要和 `startContinuousLocation` 时的保持一致。
       */
      bizType: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: boolean;
    }>;
    export function stopGyroscope(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function stopHCE(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function stopLocalServiceDiscovery(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 停止当前页面的下拉刷新。
     * @description
     * 调用 my.startPullDownRefresh 后触发下拉刷新动画，效果与用户手动下拉刷新一致（会触发 onPullDownRefresh 监听方法）。
     * 当处理完数据刷新后，my.stopPullDownRefresh 可停止当前页面的下拉刷新。
     */
    export function stopPullDownRefresh(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function stopRecord(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { error: 0 }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              error: 0;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      error: 0;
    }>;
    export function stopSpeechRecognize(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: 'true' | true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: 'true' | true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: 'true' | true;
    }>;
    export function stopVoice(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { error: 0 }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              error: 0;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      error: 0;
    }>;
    export function stopWifi(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 跳转到指定 tab 页面，并关闭其他所有非标签页页面
     * @description
     * 如果小程序是一个多标签（tab）应用，即客户端窗口的底部栏可以切换页面，那么可以通过标签页配置项指定标签栏的表现形式，以及标签切换时显示的对应页面。
     * 通过页面跳转（my.navigateTo）或者页面重定向（my.redirectTo）所到达的页面，即使是定义在标签页配置中的页面，也不会显示底部的标签栏。标签页的第一个页面必须是首页。
     */
    export function switchTab(r: {
      /**
       * @summary 跳转的特定 tab 的路径
       * @description 目标路径必须为应用内 tabbar 的，且路径后不能带参数
       */
      url: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function textToSpeech(r: {
      align?: boolean;
      text: string;
      volume?: number;
      speed?: number;
      tone?: number;
      speaker: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function unregisterSSID(r: {
      SSID: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function updateCharacteristic(r: {
      serviceId: string;
      characteristicId: string;
      value: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 上传本地资源到开发者服务器
     */
    export function uploadFile(r: {
      /**
       * @summary 开发者服务器地址。
       */
      url: string;
      /**
       * @summary 要上传文件资源的本地定位符。
       */
      filePath: string;
      /**
       * @summary 文件名，即对应的 key，开发者在服务器端通过这个 key 可以获取到文件二进制内容。
       */
      fileName: string;
      /**
       * @summary 文件类型支持图片、视频、音频（image / video / audio）。
       */
      fileType: string;
      /**
       * @summary 是否隐藏 loading 图。
       * @default false
       */
      hideLoading?: boolean;
      /**
       * @summary HTTP 请求 Header。
       */
      header?: Record<string, unknown>;
      /**
       * @summary HTTP 请求中其他额外的 form 数据。
       */
      formData?: Record<string, unknown>;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 服务器返回的数据。
         */
        data: string;
        /**
         * @summary HTTP 状态码。
         */
        statusCode: string;
        /**
         * @summary 服务器返回的 Header。
         */
        header: Record<string, unknown>;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 服务器返回的数据。
               */
              data: string;
              /**
               * @summary HTTP 状态码。
               */
              statusCode: string;
              /**
               * @summary 服务器返回的 Header。
               */
              header: Record<string, unknown>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 服务器返回的数据。
       */
      data: string;
      /**
       * @summary HTTP 状态码。
       */
      statusCode: string;
      /**
       * @summary 服务器返回的 Header。
       */
      header: Record<string, unknown>;
    }>;
    export function uploadFileToAliCloud(r: {
      /**
       * @summary 文件地址。
       */
      filePath: string;
      /**
       * @summary 业务标识。
       */
      bizType: string;
      /**
       * @summary 文件类型。
       */
      fileType: string;
      /**
       * @summary 请求头。
       */
      headers?: Record<string, unknown>;
      /**
       * @summary 失败是否要重试。
       */
      needRetry?: boolean;
      /**
       * @summary 是否是私域资源。
       * - true 为私域资源。
       * - false 为公域资源，私域资源返回的 fileUrl 默认有效期为一天。
       */
      isPrivate: boolean;
      /**
       * @summary 是否需要隐藏 loading 视图。
       * @default false
       */
      hideLoading?: boolean;
      /**
       * @summary 上传成功之后是否要删除。
       */
      needDelete?: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { fileUrl: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              fileUrl: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      fileUrl: string;
    }>;
    /**
     * @summary 调用振动功能。
     */
    export function vibrate(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: 1 }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: 1;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: 1;
    }>;
    /**
     * @summary 调用触发较长时间的振动 (400ms)。
     */
    export function vibrateLong(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: 1 }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: 1;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: 1;
    }>;
    /**
     * @summary 设备短震动
     */
    export function vibrateShort(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: 1 }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: 1;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: 1;
    }>;
    /**
     * @summary 摇一摇功能。每次调用 API，在摇一摇手机后触发回调，如需再次监听需要再次调用这个 API
     */
    export function watchShake(r: {
      monitorAccelerometer?: boolean;
      monitorCompass?: boolean;
      monitorGyroscope?: boolean;
      interval?: number;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    /**
     * @summary 向低功耗蓝牙设备特征值中写入数据
     */
    export function writeBLECharacteristicValue(r: {
      serviceId: string;
      deviceId: string;
      characteristicId: string;
      value: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    /**
     * @summary 获取基础库版本号
     * @description
     * 以 `major.minor.patch` 3 段数字作为版本号
     * - major: 大版本升级，包含架构升级，可能存在不兼容设计
     * - minor: 向前兼容的功能性迭代
     * - patch: 向前兼容的小功能及 bug 修复迭代
     */
    export const SDKVersion: string;
    export function addCardAuth(r: {
      /**
       * @summary 开卡授权的页面地址，从接口获取。
       */
      url: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(
        data:
          | {
              success: true;
              resultStatus: '9000';
              result: {
                /**
                 * @summary 应用 ID。
                 */
                app_id: string;
                /**
                 * @summary 授权码，用于换取 authtoken。
                 */
                auth_code: string;
                /**
                 * @summary 授权的 state。
                 */
                state: string;
                /**
                 * @summary 授权 scope。
                 */
                scope: string;
                /**
                 * @summary 会员卡模板 ID。
                 */
                template_id: string;
                /**
                 * @summary 会员卡表单信息请求 ID。
                 */
                request_id: string;
                /**
                 * @summary 会员卡领卡链接透传参数。
                 */
                out_string: string;
              };
            }
          | {
              success: false;
              code:
                | 'JSAPI_SERVICE_TERMINATED'
                | 'JSAPI_PARAM_INVALID'
                | 'JSAPI_SYSTEM_ERROR'
                | 'ILLEGAL_NULL_ARGUMENT'
                | 'INVALID_APPLY_CARD_LINK'
                | 'OPEN_FORM_TEMPLATE_NOT_EXIST'
                | 'ALREADY_ACTIVE_CARD'
                | 'OPEN_FORM_FIELD_NOT_PERMITTED'
                | 'OPEN_FORM_USER_LACK_INFO'
                | 'SYSTEM_ERROR';
            },
      ): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | (
              | {
                  success: true;
                  resultStatus: '9000';
                  result: {
                    /**
                     * @summary 应用 ID。
                     */
                    app_id: string;
                    /**
                     * @summary 授权码，用于换取 authtoken。
                     */
                    auth_code: string;
                    /**
                     * @summary 授权的 state。
                     */
                    state: string;
                    /**
                     * @summary 授权 scope。
                     */
                    scope: string;
                    /**
                     * @summary 会员卡模板 ID。
                     */
                    template_id: string;
                    /**
                     * @summary 会员卡表单信息请求 ID。
                     */
                    request_id: string;
                    /**
                     * @summary 会员卡领卡链接透传参数。
                     */
                    out_string: string;
                  };
                }
              | {
                  success: false;
                  code:
                    | 'JSAPI_SERVICE_TERMINATED'
                    | 'JSAPI_PARAM_INVALID'
                    | 'JSAPI_SYSTEM_ERROR'
                    | 'ILLEGAL_NULL_ARGUMENT'
                    | 'INVALID_APPLY_CARD_LINK'
                    | 'OPEN_FORM_TEMPLATE_NOT_EXIST'
                    | 'ALREADY_ACTIVE_CARD'
                    | 'OPEN_FORM_FIELD_NOT_PERMITTED'
                    | 'OPEN_FORM_USER_LACK_INFO'
                    | 'SYSTEM_ERROR';
                }
            )
          | IFailResult,
      ): void;
    }): Promise<
      | {
          success: true;
          resultStatus: '9000';
          result: {
            /**
             * @summary 应用 ID。
             */
            app_id: string;
            /**
             * @summary 授权码，用于换取 authtoken。
             */
            auth_code: string;
            /**
             * @summary 授权的 state。
             */
            state: string;
            /**
             * @summary 授权 scope。
             */
            scope: string;
            /**
             * @summary 会员卡模板 ID。
             */
            template_id: string;
            /**
             * @summary 会员卡表单信息请求 ID。
             */
            request_id: string;
            /**
             * @summary 会员卡领卡链接透传参数。
             */
            out_string: string;
          };
        }
      | {
          success: false;
          code:
            | 'JSAPI_SERVICE_TERMINATED'
            | 'JSAPI_PARAM_INVALID'
            | 'JSAPI_SYSTEM_ERROR'
            | 'ILLEGAL_NULL_ARGUMENT'
            | 'INVALID_APPLY_CARD_LINK'
            | 'OPEN_FORM_TEMPLATE_NOT_EXIST'
            | 'ALREADY_ACTIVE_CARD'
            | 'OPEN_FORM_FIELD_NOT_PERMITTED'
            | 'OPEN_FORM_USER_LACK_INFO'
            | 'SYSTEM_ERROR';
        }
    >;
    export function chooseAddress(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 用户选择的地址 id
         */
        addressId: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 用户选择的地址 id
               */
              addressId: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 用户选择的地址 id
       */
      addressId: string;
    }>;
    export function chooseInvoiceTitle(r: {
      name: string;
      param: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 用户选择的抬头动态码，目前有效期限制1小时，需尽快使用
         */
        dynamicCode: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 用户选择的抬头动态码，目前有效期限制1小时，需尽快使用
               */
              dynamicCode: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 用户选择的抬头动态码，目前有效期限制1小时，需尽快使用
       */
      dynamicCode: string;
    }>;
    /**
     * @summary 获取小程序环境变量对象
     * @description 相比于 [my.getSystemInfo]() / [my.getSystemInfoSync](), my.env 在使用上开销更低
     */
    export const env: {
      /**
       * @summary 文件系统中的用户目录路径 (本地路径)
       */
      USER_DATA_PATH: string;
      /**
       * @summary 客户端名称简写
       * @sdk 1.24.9
       * @description
       * - 支付宝客户端为 'ap'。
       */
      clientName: string;
      /**
       * @summary 客户端版本号
       * @sdk 1.24.9
       * 一般以 `major.minor.patch` 3 段数字作为版本号
       */
      clientVersion: string;
      /**
       * @summary 设置的语言。
       * @sdk 1.24.9
       * @description
       * - 简体中文: "zh-Hans"
       * - 英文: "en"
       * - 繁体中文-香港: "zh-HK"
       * - 繁体中文-台湾: "zh-Hant"
       */
      language: string;
      /**
       * @summary 系统名称
       * @sdk 1.24.9
       * @description
       * - iOS 系统: 'iOS'
       * - 安卓系统: 'Android'
       * - 其他系统: 'unknown'
       */
      platform: string;
    };
    export function getAddress(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 详细地址
         */
        address: string;
        /**
         * @summary 国家名称
         */
        country: string;
        /**
         * @summary 省
         */
        prov: string;
        /**
         * @summary 市
         */
        city: string;
        /**
         * @summary 区
         */
        area: string;
        /**
         * @summary 街道
         */
        street: string;
        /**
         * @summary 名称
         */
        fullname: string;
        /**
         * @summary 手机号
         */
        mobilePhone: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 详细地址
               */
              address: string;
              /**
               * @summary 国家名称
               */
              country: string;
              /**
               * @summary 省
               */
              prov: string;
              /**
               * @summary 市
               */
              city: string;
              /**
               * @summary 区
               */
              area: string;
              /**
               * @summary 街道
               */
              street: string;
              /**
               * @summary 名称
               */
              fullname: string;
              /**
               * @summary 手机号
               */
              mobilePhone: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 详细地址
       */
      address: string;
      /**
       * @summary 国家名称
       */
      country: string;
      /**
       * @summary 省
       */
      prov: string;
      /**
       * @summary 市
       */
      city: string;
      /**
       * @summary 区
       */
      area: string;
      /**
       * @summary 街道
       */
      street: string;
      /**
       * @summary 名称
       */
      fullname: string;
      /**
       * @summary 手机号
       */
      mobilePhone: string;
    }>;
    export function getUserInfo(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 用户id，以 "2088" 开头
         */
        userId: string;
        /**
         * @summary 用户的头像图片 URL
         */
        avatar: string;
        /**
         * @summary 用户的脱敏登录账号
         */
        loginId: string;
        /**
         * @summary 用户的脱敏真实姓名
         */
        userName: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 用户id，以 "2088" 开头
               */
              userId: string;
              /**
               * @summary 用户的头像图片 URL
               */
              avatar: string;
              /**
               * @summary 用户的脱敏登录账号
               */
              loginId: string;
              /**
               * @summary 用户的脱敏真实姓名
               */
              userName: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 用户id，以 "2088" 开头
       */
      userId: string;
      /**
       * @summary 用户的头像图片 URL
       */
      avatar: string;
      /**
       * @summary 用户的脱敏登录账号
       */
      loginId: string;
      /**
       * @summary 用户的脱敏真实姓名
       */
      userName: string;
    }>;
    export function iotCheckService(r: {
      serviceId?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { exist: boolean; errorCode: string; errorMessage: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              exist: boolean;
              errorCode: string;
              errorMessage: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      exist: boolean;
      errorCode: string;
      errorMessage: string;
    }>;
    export function iotCreateService(r: {
      serviceId?: string;
      serviceName: string;
      remark?: string;
      urlParams?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { errorCode: string; errorMessage: string; success: boolean }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              errorCode: string;
              errorMessage: string;
              success: boolean;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      errorCode: string;
      errorMessage: string;
      success: boolean;
    }>;
    export function navigateToCouponDetail(r: {
      itemId: string;
      chInfo: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { [x: string]: any; [x: number]: any; [x: symbol]: any }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              [x: string]: any;
              [x: number]: any;
              [x: symbol]: any;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      [x: string]: any;
      [x: number]: any;
      [x: symbol]: any;
    }>;
    export function openCarService(r: {
      /**
       * @summary 服务类型 id。
       * 有效值：
       * - '0' 保养服务
       * - '1' 爱车估值
       * - '2' 加油充值
       */
      serviceId: string;
      /**
       * @summary 地址码，比如 `110100`。
       */
      addressCode?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openCardDetail(r: {
      /**
       * @summary 卡实例 ID。
       */
      passId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openCardList(r: {
      param: Record<string, string>;
      appId: string;
      closeCurrentApp: boolean;
      appClearTop: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openChatWindow(r: {
      userId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openCustomerService(r: {
      /**
       * @summary 租户Id
       */
      tntInstId: string;
      /**
       * @summary 聊天窗编号
       */
      scene: string;
      /**
       * @summary 用户id
       */
      alipayCardNo?: string;
      /**
       * @summary
       */
      extInfo?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openKBVoucherDetail(r: {
      /**
       * @summary 卡实例 ID，调用 [券发放接口](https://docs.open.alipay.com/api_24/alipay.pass.instance.add) 可以获取该参数。
       */
      passId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openKBVoucherDetail(r: {
      /**
       * @summary 商户编号。
       */
      partnerId: string;
      /**
       * @summary 序列号。
       */
      serialNumber: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openMerchantCardList(r: {
      /**
       * @summary 商户编号。
       */
      partnerId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openMerchantTicketList(r: {
      /**
       * @summary 商户编号。
       */
      partnerId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openMerchantVoucherList(r: {
      /**
       * @summary 商户编号。
       */
      partnerId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openTaobao(r: {
      isLite?: boolean;
      url: string;
      login?: boolean;
      extraQuery?: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { success: true }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              success: true;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      success: true;
    }>;
    export function openTicketDetail(r: {
      /**
       * @summary 卡实例 ID，调用 [券发放接口](https://docs.open.alipay.com/api_24/alipay.pass.instance.add) 可以获取该参数。
       */
      passId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openTicketDetail(r: {
      /**
       * @summary 商户编号。
       */
      partnerId: string;
      /**
       * @summary 序列号。
       */
      serialNumber: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openTicketList(r: {
      param: Record<string, string>;
      appId: string;
      closeCurrentApp: boolean;
      appClearTop: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openVoucherDetail(r: {
      /**
       * @summary 卡实例 ID，调用 [券发放接口](https://docs.open.alipay.com/api_24/alipay.pass.instance.add) 可以获取该参数。
       */
      passId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openVoucherDetail(r: {
      /**
       * @summary 商户编号。
       */
      partnerId: string;
      /**
       * @summary 序列号。
       */
      serialNumber: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openVoucherList(r: {
      param: Record<string, string>;
      appId: string;
      closeCurrentApp: boolean;
      appClearTop: boolean;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function paySignCenter(r: {
      /**
       * @summary 签约字符串。
       */
      signStr: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 处理结果（如需该字段内部参数，切记先 `JSON.parse` 一下）。
         * `JSON.parse` 后的对象结构如下：
         * - `sign`，类型 `string`，签名
         * - `sign_type`，类型 `string`，签名算法类型
         * - `alipay_user_agreement_page_sign_response`，类型 `object`
         */
        result: string;
        /**
         * @summary 签约结果码。
         */
        resultStatus: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 处理结果（如需该字段内部参数，切记先 `JSON.parse` 一下）。
               * `JSON.parse` 后的对象结构如下：
               * - `sign`，类型 `string`，签名
               * - `sign_type`，类型 `string`，签名算法类型
               * - `alipay_user_agreement_page_sign_response`，类型 `object`
               */
              result: string;
              /**
               * @summary 签约结果码。
               */
              resultStatus: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 处理结果（如需该字段内部参数，切记先 `JSON.parse` 一下）。
       * `JSON.parse` 后的对象结构如下：
       * - `sign`，类型 `string`，签名
       * - `sign_type`，类型 `string`，签名算法类型
       * - `alipay_user_agreement_page_sign_response`，类型 `object`
       */
      result: string;
      /**
       * @summary 签约结果码。
       */
      resultStatus: string;
    }>;
    export function startAPVerify(r: {
      /**
       * @summary 通过 `alipay.user.certify.open.initialize` 接口获取的 `url` 认证链接，需要服务端通过开放平台接口获取后，再给前端进行调用。
       */
      url: string;
      /**
       * @summary 通过 `alipay.user.certify.open.certify` 接口获取的 `certifyId`，需要服务端通过开放平台接口获取后，再给前端进行调用。
       */
      certifyId: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 认证流程结果状态码
         */
        resultStatus: string;
        /**
         * @summary 本次认证流水号
         */
        certifyId: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 认证流程结果状态码
               */
              resultStatus: string;
              /**
               * @summary 本次认证流水号
               */
              certifyId: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 认证流程结果状态码
       */
      resultStatus: string;
      /**
       * @summary 本次认证流水号
       */
      certifyId: string;
    }>;
    export function startZMCreditRent(r: {
      /**
       * @summary 固定传：`rent`
       */
      creditRentType: string;
      /**
       * @summary 类目（芝麻开发给到），暂时可以用：`ZMSC_2_1`
       */
      category: string;
      /**
       * @summary 商品内容
       */
      subject: {
        products: IProduct[];
      };
      /**
       * @summary 逾期时间，`yyyy-MM-dd HH:mm:ss`，需要大于当前时间
       */
      overdue_time: string;
      /**
       * @summary 该次支付总金额，单位为元，精确到小数点后两位，取值范围 `[0.01,100000000]`
       */
      amount: string;
      /**
       * @summary 外部订单号，即商户自己的订单号
       */
      out_order_no: string;
      /**
       * @summary 入驻信用套餐分配的项目id
       */
      item_id: string;
      /**
       * @summary 订单处理url，商户处理订单的页面，例如订单详情url
       */
      order_process_url: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: any): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: any | IFailResult): void;
    }): Promise<any>;
    export function startZMVerify(r: {
      /**
       * @summary 认证标识
       */
      bizNo: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 认证标识
         */
        token: string;
        /**
         * @summary 认证是否通过
         */
        passed: string;
        /**
         * @summary 认证不通过原因
         */
        reason?: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 认证标识
               */
              token: string;
              /**
               * @summary 认证是否通过
               */
              passed: string;
              /**
               * @summary 认证不通过原因
               */
              reason?: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 认证标识
       */
      token: string;
      /**
       * @summary 认证是否通过
       */
      passed: string;
      /**
       * @summary 认证不通过原因
       */
      reason?: string;
    }>;
    export function textRiskIdentification(r: {
      content: string;
      type: string[];
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        result: {
          /**
           * @summary 目标内容文本识别到的类型。
           */
          type: 'keyword' | '0' | '1' | '2';
          /**
           * @summary 仅当识别命中了 `type` 为 `keyword` 时，才会返回该字段。
           */
          hitKeywords?: string[];
          /**
           * @summary 识别命中得分，最高分为 `100` 分。仅当识别没有命中 `keyword`，但入参中包含了 `广告` 或 `涉政` 或 `涉黄` 时，才会返回该字段。
           */
          score?: string;
        };
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              result: {
                /**
                 * @summary 目标内容文本识别到的类型。
                 */
                type: 'keyword' | '0' | '1' | '2';
                /**
                 * @summary 仅当识别命中了 `type` 为 `keyword` 时，才会返回该字段。
                 */
                hitKeywords?: string[];
                /**
                 * @summary 识别命中得分，最高分为 `100` 分。仅当识别没有命中 `keyword`，但入参中包含了 `广告` 或 `涉政` 或 `涉黄` 时，才会返回该字段。
                 */
                score?: string;
              };
            }
          | IFailResult,
      ): void;
    }): Promise<{
      result: {
        /**
         * @summary 目标内容文本识别到的类型。
         */
        type: 'keyword' | '0' | '1' | '2';
        /**
         * @summary 仅当识别命中了 `type` 为 `keyword` 时，才会返回该字段。
         */
        hitKeywords?: string[];
        /**
         * @summary 识别命中得分，最高分为 `100` 分。仅当识别没有命中 `keyword`，但入参中包含了 `广告` 或 `涉政` 或 `涉黄` 时，才会返回该字段。
         */
        score?: string;
      };
    }>;
    export function tradePay(r: {
      /**
       * @summary 接入小程序支付时传入此参数。此参数为支付宝交易号，注意参数有大小写区分。
       */
      tradeNO: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { resultCode: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              resultCode: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      resultCode: string;
    }>;
    export function tradePay(r: {
      /**
       * @summary 完整的支付参数拼接成的字符串，从服务端获取。
       */
      orderStr: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { resultCode: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              resultCode: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      resultCode: string;
    }>;
    export function zmCreditBorrow(r: IZmCreditBorrowRequest4OpenZMCreditBorrowPage): Promise<{
      /**
       * @summary 商户发起借用服务时传入的参数，需要在借用结束后返回给商户的参数。
       */
      invoke_state: string;
      /**
       * @summary 外部订单号，需要唯一，由商户传入，芝麻内部会做幂等控制，格式为：yyyyMMddHHmmss+4位随机数
       */
      out_order_no: string;
      /**
       * @summary 芝麻信用借还订单号
       */
      order_no: string;
      /**
       * @summary 是否准入，该字段目前无实际意义。
       * - `Y` 准入
       * - `N` 不准入
       */
      admit_state: 'Y' | 'N';
      /**
       * @summary 物品借用/租赁者的用户id
       */
      user_id: string;
      /**
       * @summary 状态码。
       * - `'6001'` 用户取消了业务流程
       * - `'6002'` 网络异常
       * - `'9000'` 成功
       * - `'4000'` 系统异常
       */
      resultStatus: string;
    }>;
    export function zmCreditBorrow(r: IZmCreditBorrowRequest4OpenZMCreditBorrowMapPage): Promise<{
      /**
       * @summary 商户发起借用服务时传入的参数，需要在借用结束后返回给商户的参数。
       */
      invoke_state: string;
      /**
       * @summary 外部订单号，需要唯一，由商户传入，芝麻内部会做幂等控制，格式为：yyyyMMddHHmmss+4位随机数
       */
      out_order_no: string;
      /**
       * @summary 芝麻信用借还订单号
       */
      order_no: string;
      /**
       * @summary 是否准入，该字段目前无实际意义。
       * - `Y` 准入
       * - `N` 不准入
       */
      admit_state: 'Y' | 'N';
      /**
       * @summary 物品借用/租赁者的用户id
       */
      user_id: string;
      /**
       * @summary 状态码。
       * - `'6001'` 用户取消了业务流程
       * - `'6002'` 网络异常
       * - `'9000'` 成功
       * - `'4000'` 系统异常
       */
      resultStatus: string;
    }>;
    export function zmFreeDeposit(r: {
      /**
       * @summary 后端生成的 openapi 地址。
       */
      url: string;
      /**
       * @summary 当前环境。
       * @default "prod"
       */
      env?: 'prod' | 'stable';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 免押流程是否完成
         */
        success: boolean;
        /**
         * @summary 流程完成时返回的JSON字符串
         */
        biz_content: string;
        /**
         * @summary 流程完成时返回的签名
         */
        sign: string;
        /**
         * @summary 流程完成时返回的额度状态。
         * - `HAS_LIMIT` 有授信额度
         * - `NO_LIMIT` 无授信额度
         */
        status_code: 'HAS_LIMIT' | 'NO_LIMIT';
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 免押流程是否完成
               */
              success: boolean;
              /**
               * @summary 流程完成时返回的JSON字符串
               */
              biz_content: string;
              /**
               * @summary 流程完成时返回的签名
               */
              sign: string;
              /**
               * @summary 流程完成时返回的额度状态。
               * - `HAS_LIMIT` 有授信额度
               * - `NO_LIMIT` 无授信额度
               */
              status_code: 'HAS_LIMIT' | 'NO_LIMIT';
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 免押流程是否完成
       */
      success: boolean;
      /**
       * @summary 流程完成时返回的JSON字符串
       */
      biz_content: string;
      /**
       * @summary 流程完成时返回的签名
       */
      sign: string;
      /**
       * @summary 流程完成时返回的额度状态。
       * - `HAS_LIMIT` 有授信额度
       * - `NO_LIMIT` 无授信额度
       */
      status_code: 'HAS_LIMIT' | 'NO_LIMIT';
    }>;
    export function zmRentTransition(r: {
      /**
       * @summary 固定传：signPay。
       */
      creditRentType: string;
      /**
       * @summary 商户业务标识，透传。
       */
      channel: string;
      /**
       * @summary 该次支付总金额，单位为元，精确到小数点后两位，取值范围 [0.01,100000000]。
       */
      amount: string;
      /**
       * @summary 押金；单位为元，精确到小数点后两位，取值范围 [0.01,100000000]。
       */
      deposit: string;
      /**
       * @summary 芝麻订单号。
       */
      zmOrderNo: string;
      /**
       * @summary 类目（芝麻开发给到），暂时可以用：ZMSC_2_1。
       */
      category: string;
      /**
       * @summary 外部订单号，即商户自己的订单号。
       */
      outOrderNo: string;
      /**
       * @summary 逾期时间，yyyy-MM-dd HH:mm:ss，需要大于当前时间。
       */
      overdue_time: string;
      subject: {
        products: IProduct[];
      };
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { [x: string]: any; [x: number]: any; [x: symbol]: any }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              [x: string]: any;
              [x: number]: any;
              [x: symbol]: any;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      [x: string]: any;
      [x: number]: any;
      [x: symbol]: any;
    }>;
    export function ARScan(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function authorize(r: {
      /**
       * @summary 需要获取权限类型
       */
      scopes: `${EAuthCodeScope}` | Array<`${EAuthCodeScope}`>;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 授权码
         */
        authCode: string;
        /**
         * @summary 失败的授权类型，key 是授权失败的 scope，value 是对应的错误码
         */
        authErrorScopes: Record<EAuthCodeScope, string>;
        /**
         * @summary 成功的授权 scope
         */
        authSuccessScopes: Array<`${EAuthCodeScope}`>;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 授权码
               */
              authCode: string;
              /**
               * @summary 失败的授权类型，key 是授权失败的 scope，value 是对应的错误码
               */
              authErrorScopes: Record<EAuthCodeScope, string>;
              /**
               * @summary 成功的授权 scope
               */
              authSuccessScopes: Array<`${EAuthCodeScope}`>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 授权码
       */
      authCode: string;
      /**
       * @summary 失败的授权类型，key 是授权失败的 scope，value 是对应的错误码
       */
      authErrorScopes: Record<EAuthCodeScope, string>;
      /**
       * @summary 成功的授权 scope
       */
      authSuccessScopes: Array<`${EAuthCodeScope}`>;
    }>;
    export function getAuthCode(r: {
      /**
       * @summary 授权类型
       * @default auth_base
       */
      scopes?: `${EAuthCodeScope}` | Array<`${EAuthCodeScope}`>;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 授权码
         */
        authCode: string;
        /**
         * @summary 失败的授权类型，key 是授权失败的 scope，value 是对应的错误码
         */
        authErrorScopes: Record<EAuthCodeScope, string>;
        /**
         * @summary 成功的授权 scope
         */
        authSuccessScopes: Array<`${EAuthCodeScope}`>;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 授权码
               */
              authCode: string;
              /**
               * @summary 失败的授权类型，key 是授权失败的 scope，value 是对应的错误码
               */
              authErrorScopes: Record<EAuthCodeScope, string>;
              /**
               * @summary 成功的授权 scope
               */
              authSuccessScopes: Array<`${EAuthCodeScope}`>;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 授权码
       */
      authCode: string;
      /**
       * @summary 失败的授权类型，key 是授权失败的 scope，value 是对应的错误码
       */
      authErrorScopes: Record<EAuthCodeScope, string>;
      /**
       * @summary 成功的授权 scope
       */
      authSuccessScopes: Array<`${EAuthCodeScope}`>;
    }>;
    export function getAuthUserInfo(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        /**
         * @summary 用户昵称。
         */
        nickName: string;
        /**
         * @summary 用户头像链接。
         */
        avatar: string;
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              /**
               * @summary 用户昵称。
               */
              nickName: string;
              /**
               * @summary 用户头像链接。
               */
              avatar: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      /**
       * @summary 用户昵称。
       */
      nickName: string;
      /**
       * @summary 用户头像链接。
       */
      avatar: string;
    }>;
    export function getSetting(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: {
        authSetting: {
          /**
           * @summary 地理位置。
           */
          location?: boolean;
          /**
           * @summary 保存到相册。
           */
          album?: boolean;
          /**
           * @summary 摄像头。
           */
          camera?: boolean;
          /**
           * @summary 唤起授权界面，用户可以授权小程序获取支付宝会员的基础信息。
           */
          userInfo?: boolean;
          /**
           * @summary 运动数据
           */
          alipaysports?: boolean;
          /**
           * @summary 手机号码
           */
          phoneNumber?: boolean;
          /**
           * @summary 收货地址
           */
          aliaddress?: boolean;
        };
      }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              authSetting: {
                /**
                 * @summary 地理位置。
                 */
                location?: boolean;
                /**
                 * @summary 保存到相册。
                 */
                album?: boolean;
                /**
                 * @summary 摄像头。
                 */
                camera?: boolean;
                /**
                 * @summary 唤起授权界面，用户可以授权小程序获取支付宝会员的基础信息。
                 */
                userInfo?: boolean;
                /**
                 * @summary 运动数据
                 */
                alipaysports?: boolean;
                /**
                 * @summary 手机号码
                 */
                phoneNumber?: boolean;
                /**
                 * @summary 收货地址
                 */
                aliaddress?: boolean;
              };
            }
          | IFailResult,
      ): void;
    }): Promise<{
      authSetting: {
        /**
         * @summary 地理位置。
         */
        location?: boolean;
        /**
         * @summary 保存到相册。
         */
        album?: boolean;
        /**
         * @summary 摄像头。
         */
        camera?: boolean;
        /**
         * @summary 唤起授权界面，用户可以授权小程序获取支付宝会员的基础信息。
         */
        userInfo?: boolean;
        /**
         * @summary 运动数据
         */
        alipaysports?: boolean;
        /**
         * @summary 手机号码
         */
        phoneNumber?: boolean;
        /**
         * @summary 收货地址
         */
        aliaddress?: boolean;
      };
    }>;
    export function ocr(r: {
      path?: string;
      imageBase64?: string;
      side?: 'face' | 'back';
      ocrType:
        | 'ocr_general'
        | 'ocr_bank_card'
        | 'ocr_vehicle'
        | 'ocr_business_license'
        | 'ocr_train_ticket'
        | 'ocr_driver_license'
        | 'ocr_business_card'
        | 'ocr_passport'
        | 'ocr_vehicle_plate'
        | 'ocr_vin';
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: { result: unknown; ocrType: string }): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(
        arg:
          | {
              result: unknown;
              ocrType: string;
            }
          | IFailResult,
      ): void;
    }): Promise<{
      result: unknown;
      ocrType: string;
    }>;
    export function openOtherApplication(r: {
      url: string;
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    export function openSetting(r?: {
      /**
       * 接口调用成功的回调函数
       * @param data 成功返回的数据
       */
      success?(data: void): void;
      /**
       * 接口调用失败的回调函数
       * @param err 错误信息
       */
      fail?(err: IFailResult): void;
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?(arg: void | IFailResult): void;
    }): Promise<void>;
    namespace NFCAdapter {
      export interface Ndef {
        onNdefMessage(
          cb: (arg: {
            message: Array<{
              tnf: ArrayBuffer;
              type: ArrayBuffer;
              id: ArrayBuffer;
              payload: ArrayBuffer;
            }>;
          }) => void,
        ): void;
        offNdefMessage(
          cb: (arg: {
            message: Array<{
              tnf: ArrayBuffer;
              type: ArrayBuffer;
              id: ArrayBuffer;
              payload: ArrayBuffer;
            }>;
          }) => void,
        ): void;
        writeNdefMessage(r: {
          instanceId: string;
          records: Array<{
            tnf: string;
            id: string;
            type: string;
            payload: string;
          }>;
          /**
           * 接口调用成功的回调函数
           * @param data 成功返回的数据
           */
          success?(data: { success: true }): void;
          /**
           * 接口调用失败的回调函数
           * @param err 错误信息
           */
          fail?(err: IFailResult): void;
          /**
           * 接口调用结束的回调函数（调用成功、失败都会执行）
           */
          complete?(
            arg:
              | {
                  success: true;
                }
              | IFailResult,
          ): void;
        }): Promise<{
          success: true;
        }>;
        readNdefMessage(r: {
          instanceId: string;
          /**
           * 接口调用成功的回调函数
           * @param data 成功返回的数据
           */
          success?(data: {
            data: {
              messages: [
                {
                  records: Array<{
                    tnf: string;
                    id: string;
                    type: string;
                    payload: string;
                  }>;
                },
              ];
            };
          }): void;
          /**
           * 接口调用失败的回调函数
           * @param err 错误信息
           */
          fail?(err: IFailResult): void;
          /**
           * 接口调用结束的回调函数（调用成功、失败都会执行）
           */
          complete?(
            arg:
              | {
                  data: {
                    messages: [
                      {
                        records: Array<{
                          tnf: string;
                          id: string;
                          type: string;
                          payload: string;
                        }>;
                      },
                    ];
                  };
                }
              | IFailResult,
          ): void;
        }): Promise<{
          data: {
            messages: [
              {
                records: Array<{
                  tnf: string;
                  id: string;
                  type: string;
                  payload: string;
                }>;
              },
            ];
          };
        }>;
        connect(r: {
          instanceId: string;
          /**
           * 接口调用成功的回调函数
           * @param data 成功返回的数据
           */
          success?(data: { success: true }): void;
          /**
           * 接口调用失败的回调函数
           * @param err 错误信息
           */
          fail?(err: IFailResult): void;
          /**
           * 接口调用结束的回调函数（调用成功、失败都会执行）
           */
          complete?(
            arg:
              | {
                  success: true;
                }
              | IFailResult,
          ): void;
        }): Promise<{
          success: true;
        }>;
        close(r: {
          instanceId: string;
          /**
           * 接口调用成功的回调函数
           * @param data 成功返回的数据
           */
          success?(data: { success: true }): void;
          /**
           * 接口调用失败的回调函数
           * @param err 错误信息
           */
          fail?(err: IFailResult): void;
          /**
           * 接口调用结束的回调函数（调用成功、失败都会执行）
           */
          complete?(
            arg:
              | {
                  success: true;
                }
              | IFailResult,
          ): void;
        }): Promise<{
          success: true;
        }>;
        setTimeout(r: {
          timeout: number;
          instanceId: string;
          /**
           * 接口调用成功的回调函数
           * @param data 成功返回的数据
           */
          success?(data: { success: true }): void;
          /**
           * 接口调用失败的回调函数
           * @param err 错误信息
           */
          fail?(err: IFailResult): void;
          /**
           * 接口调用结束的回调函数（调用成功、失败都会执行）
           */
          complete?(
            arg:
              | {
                  success: true;
                }
              | IFailResult,
          ): void;
        }): Promise<{
          success: true;
        }>;
        transceive(r: {
          data: ArrayBuffer;
          instanceId: string;
          /**
           * 接口调用成功的回调函数
           * @param data 成功返回的数据
           */
          success?(data: { data: ArrayBuffer }): void;
          /**
           * 接口调用失败的回调函数
           * @param err 错误信息
           */
          fail?(err: IFailResult): void;
          /**
           * 接口调用结束的回调函数（调用成功、失败都会执行）
           */
          complete?(
            arg:
              | {
                  data: ArrayBuffer;
                }
              | IFailResult,
          ): void;
        }): Promise<{
          data: ArrayBuffer;
        }>;
        getMaxTransceiveLength(r: {
          instanceId: string;
          /**
           * 接口调用成功的回调函数
           * @param data 成功返回的数据
           */
          success?(data: { length: number }): void;
          /**
           * 接口调用失败的回调函数
           * @param err 错误信息
           */
          fail?(err: IFailResult): void;
          /**
           * 接口调用结束的回调函数（调用成功、失败都会执行）
           */
          complete?(
            arg:
              | {
                  length: number;
                }
              | IFailResult,
          ): void;
        }): Promise<{
          length: number;
        }>;
      }
      export interface NfcA {}
      export interface IsoDep {}
      export interface NfcV {}
      export interface NfcB {}
      export interface NfcF {}
      export interface MifareClassic {}
      export interface MifareUltralight {}
    }
    export interface RDSContext {}
    export interface FileSystemManager {
      mkdirSync(dirPath: string, recrsive: boolean): void;
      mkdirSync(option: {
        /**
         * @summary 创建的目录路径
         */
        dirPath: string;
        /**
         * @summary 是否在递归创建该目录的上级目录后再创建该目录
         * @description 如果对应的上级目录已经存在，则不创建该上级目录。如 dirPath 为 a/b/c/d 且 recursive 为 true，将创建 a 目录，再在 a 目录下创建 b 目录，以此类推直至创建 a/b/c 目录下的 d 目录。
         * @default false
         */
        recrsive?: boolean;
      }): void;
      mkdir(r: {
        /**
         * @summary 创建的目录路径
         */
        dirPath: string;
        /**
         * @summary 是否在递归创建该目录的上级目录后再创建该目录
         * @description 如果对应的上级目录已经存在，则不创建该上级目录。如 dirPath 为 a/b/c/d 且 recursive 为 true，将创建 a 目录，再在 a 目录下创建 b 目录，以此类推直至创建 a/b/c 目录下的 d 目录。
         * @default false
         */
        recrsive?: boolean;
        /**
         * 接口调用成功的回调函数
         * @param data 成功返回的数据
         */
        success?(data: { success: true }): void;
        /**
         * 接口调用失败的回调函数
         * @param err 错误信息
         */
        fail?(err: IFailResult): void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?(
          arg:
            | {
                success: true;
              }
            | IFailResult,
        ): void;
      }): Promise<{
        success: true;
      }>;
    }
    export interface NFCAdapter {
      getNdef(): NFCAdapter.Ndef;
    }
    export interface WebViewContext {
      postMessage(message: Record<string, unknown>): void;
    }
    export interface XnnGraphTransaction {
      param(
        nodeName: string,
        options: Record<
          string,
          {
            type: 'BOOL' | 'INT' | 'FLOAT' | 'DOUBLE' | 'STRING' | 'INT_ARRAY' | 'FLOAT_ARRAY' | 'DOUBLE_ARRAY' | 'STRING_ARRAY' | 'APFILEPATH' | 'IMAGE';
            value: unknown;
          }
        >,
      ): this;
      view(nodeName: string, elementId: string): this;
      callback(nodeName: string, callback: () => void): this;
      commit(r?: {
        /**
         * 接口调用成功的回调函数
         * @param data 成功返回的数据
         */
        success?(data: { success: boolean }): void;
        /**
         * 接口调用失败的回调函数
         * @param err 错误信息
         */
        fail?(err: IFailResult): void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?(
          arg:
            | {
                success: boolean;
              }
            | IFailResult,
        ): void;
      }): Promise<{
        success: boolean;
      }>;
    }
    export interface Animation {
      step(config: {
        /**
         * @summary 动画持续时间，单位 ms
         * @default 400
         */
        duration?: number;
        /**
         * @summary 动画的效果
         * @default "linear"
         */
        timeFunction?: string;
        /**
         * @summary 动画延迟时间，单位 ms
         */
        delay?: number;
        /**
         * @summary 动画变形的原点
         * @default "50% 50% 0"
         */
        transformOrigin?: string;
      }): this;
      export(): unknown;
      opacity(opacity: number): this;
      backgroundColor(color: string): this;
      width(length: string | number): this;
      height(length: string | number): this;
      rotate(deg: string | number): this;
      rotateX(deg: string | number): this;
      rotateY(deg: string | number): this;
      scale(x: number, y: number): this;
      scaleX(x: number): this;
      scaleY(y: number): this;
      translate(x: number, y: number): this;
      translateX(x: number): this;
      translateY(y: number): this;
      top(length: string | number): this;
      left(length: string | number): this;
      bottom(length: string | number): this;
      right(length: string | number): this;
      rotateZ(deg: string | number): this;
      rotate3d(x: string | number, y: string | number, z: string | number, deg: string | number): this;
      skew(x: string | number, y?: string | number): this;
      skewX(x: string | number): this;
      skewY(y: string | number): this;
      scaleZ(z: string | number): this;
      scale3d(sx: string | number, sy: string | number, sz: string | number): this;
      translateZ(z: string | number): this;
      translate3d(tx: string | number, ty: string | number, tz: string | number): this;
    }
    export interface SelectorQuery {
      select(selector: string): this;
      selectAll(selector: string): this;
      selectViewport(): this;
      boundingClientRect(): this;
      scrollOffset(): this;
      exec(callback: (res: ArrayLike<any>) => void): void;
      in(componentInstance: unknown): this;
      context(callback: (res: unknown) => void): this;
      node(callback: (res: unknown) => void): this;
      fields(
        option: {
          id: boolean;
          dataset: boolean;
          rect: boolean;
          size: boolean;
          scrollOffset: boolean;
          computedStyle: string[];
          context: boolean;
          node: boolean;
        },
        callback: (res: unknown) => void,
      ): this;
    }
    export interface MapContext {
      calculateDistance(r: {
        /**
         * @summary 路线中点的经纬度数组。
         */
        points: ILocation[];
        /**
         * @summary 是否需要计算总距离。
         * @default true
         */
        exportTotalDistance?: boolean;
        /**
         * @summary 目标距离（直线距离）数组。
         */
        targetDistances?: number[];
        /**
         * 接口调用成功的回调函数
         * @param data 成功返回的数据
         */
        success?(data: {
          /**
           * @summary 总路径长度。（如果传入的 exportTotalDistance 为 false，则不返回 distance。）
           */
          distance: number;
          /**
           * @summary 符合目标距离的点，对应的经纬度。
           */
          targetPoints: ITargetPoint[];
        }): void;
        /**
         * 接口调用失败的回调函数
         * @param err 错误信息
         */
        fail?(err: IFailResult): void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?(
          arg:
            | {
                /**
                 * @summary 总路径长度。（如果传入的 exportTotalDistance 为 false，则不返回 distance。）
                 */
                distance: number;
                /**
                 * @summary 符合目标距离的点，对应的经纬度。
                 */
                targetPoints: ITargetPoint[];
              }
            | IFailResult,
        ): void;
      }): Promise<{
        /**
         * @summary 总路径长度。（如果传入的 exportTotalDistance 为 false，则不返回 distance。）
         */
        distance: number;
        /**
         * @summary 符合目标距离的点，对应的经纬度。
         */
        targetPoints: ITargetPoint[];
      }>;
    }
    export interface CameraContext {
      takePhoto(r: {
        /**
         * @summary 成像质量
         * @default 'normal'
         */
        quality?: 'high' | 'low' | 'normal';
        /**
         * 接口调用成功的回调函数
         * @param data 成功返回的数据
         */
        success?(data: {
          success: boolean;
          /**
           * @summary 照片文件的临时路径
           */
          tempImagePath: string;
        }): void;
        /**
         * 接口调用失败的回调函数
         * @param err 错误信息
         */
        fail?(err: IFailResult): void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?(
          arg:
            | {
                success: boolean;
                /**
                 * @summary 照片文件的临时路径
                 */
                tempImagePath: string;
              }
            | IFailResult,
        ): void;
      }): Promise<{
        success: boolean;
        /**
         * @summary 照片文件的临时路径
         */
        tempImagePath: string;
      }>;
      startRecord(r: {
        /**
         * @summary 录像自动结束回调
         */
        timeoutCallback?: (res: {
          /**
           * @summary 封面图片文件的临时路径
           */
          tempThumbPath: string;
          /**
           * @summary 视频的文件的临时路径
           */
          tempVideoPath: string;
        }) => void;
        /**
         * @summary 最长录制时间
         */
        maxDuration?: number;
        /**
         * 接口调用成功的回调函数
         * @param data 成功返回的数据
         */
        success?(data: { success: boolean }): void;
        /**
         * 接口调用失败的回调函数
         * @param err 错误信息
         */
        fail?(err: IFailResult): void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?(
          arg:
            | {
                success: boolean;
              }
            | IFailResult,
        ): void;
      }): Promise<{
        success: boolean;
      }>;
      stopRecord(r?: {
        /**
         * 接口调用成功的回调函数
         * @param data 成功返回的数据
         */
        success?(data: {
          success: boolean;
          /**
           * @summary 封面图片文件的临时路径
           */
          tempThumbPath: string;
          /**
           * @summary 视频的文件的临时路径
           */
          tempVideoPath: string;
        }): void;
        /**
         * 接口调用失败的回调函数
         * @param err 错误信息
         */
        fail?(err: IFailResult): void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?(
          arg:
            | {
                success: boolean;
                /**
                 * @summary 封面图片文件的临时路径
                 */
                tempThumbPath: string;
                /**
                 * @summary 视频的文件的临时路径
                 */
                tempVideoPath: string;
              }
            | IFailResult,
        ): void;
      }): Promise<{
        success: boolean;
        /**
         * @summary 封面图片文件的临时路径
         */
        tempThumbPath: string;
        /**
         * @summary 视频的文件的临时路径
         */
        tempVideoPath: string;
      }>;
      onCameraFrame(
        callback: (res: {
          /**
           * @summary 图像数据矩形的宽度
           */
          width: number;
          /**
           * @summary 图像数据矩形的高度
           */
          height: number;
          /**
           * @summary 图像像素点数据，一维数组，每四项表示一个像素点的 rgba
           */
          data: ArrayBuffer;
        }) => void,
      ): CameraFrameListener;
    }
    export interface CameraFrameListener {
      start(r?: {
        /**
         * 接口调用成功的回调函数
         * @param data 成功返回的数据
         */
        success?(data: void): void;
        /**
         * 接口调用失败的回调函数
         * @param err 错误信息
         */
        fail?(err: IFailResult): void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?(arg: void | IFailResult): void;
      }): Promise<void>;
      stop(r?: {
        /**
         * 接口调用成功的回调函数
         * @param data 成功返回的数据
         */
        success?(data: void): void;
        /**
         * 接口调用失败的回调函数
         * @param err 错误信息
         */
        fail?(err: IFailResult): void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?(arg: void | IFailResult): void;
      }): Promise<void>;
    }
    export interface UpdateManager {
      applyUpdate(r?: {
        /**
         * 接口调用成功的回调函数
         * @param data 成功返回的数据
         */
        success?(data: { success: true }): void;
        /**
         * 接口调用失败的回调函数
         * @param err 错误信息
         */
        fail?(err: IFailResult): void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?(
          arg:
            | {
                success: true;
              }
            | IFailResult,
        ): void;
      }): Promise<{
        success: true;
      }>;
      offCheckForUpdate(cb: (arg: { hasUpdate: boolean }) => void): void;
      onCheckForUpdate(cb: (arg: { hasUpdate: boolean }) => void): void;
      onUpdateFailed(cb: () => void): void;
      onUpdateReady(cb: () => void): void;
    }
    export interface EventChannel {
      emit(eventName: string, ...args: unknown[]): void;
      on(eventName: string, callback: (...args: unknown[]) => void): void;
      off(eventName: string, callback?: (...args: unknown[]) => void): void;
      once(eventName: string, callback: (...args: unknown[]) => void): void;
    }
    export interface Worker {
      postMessage(message: Record<string, unknown>): void;
      onMessage(cb: (arg: { [key: string]: unknown }) => void): void;
      offMessage(cb: (arg: { [key: string]: unknown }) => void): void;
      terminate(): void;
    }
    /**
     * @name Scope
     */
    enum EAuthCodeScope {
      /**
       * @summary 静默授权。
       */
      'auth_base' = 'auth_base',
      /**
       * @summary 主动授权。
       */
      'auth_user' = 'auth_user',
      /**
       * @summary 获取用户芝麻信息。
       */
      'auth_zhima' = 'auth_zhima',
    }
    enum EAuthType {
      /**
       * @summary 蓝牙
       */
      BLUETOOTH = 'BLUETOOTH',
      /**
       * @summary 后台保活权限
       * @native 10.0.18
       * @ios false
       */
      BACKGROUNDER = 'BACKGROUNDER',
      /**
       * @summary 桌面快捷权限
       * @native 10.0.18
       * @ios false
       */
      SHORTCUT = 'SHORTCUT',
      /**
       * @summary Push 通知栏权限
       */
      NOTIFICATION = 'NOTIFICATION',
      /**
       * @summary 自启动权限
       * @native 10.0.18
       * @ios false
       */
      SELFSTARTING = 'SELFSTARTING',
      /**
       * @summary 存储权限
       * @native 10.0.18
       * @ios false
       */
      STORAGE = 'STORAGE',
      /**
       * @summary 麦克风权限
       */
      MICROPHONE = 'MICROPHONE',
      /**
       * @summary 通讯录权限
       */
      ADDRESSBOOK = 'ADDRESSBOOK',
      /**
       * @summary 相机权限
       */
      CAMERA = 'CAMERA',
      /**
       * @summary 照片权限
       */
      PHOTO = 'PHOTO',
      /**
       * @summary 地理位置系统总开关
       * @native 10.0.18
       * @ios false
       */
      LBSSERVICE = 'LBSSERVICE',
      /**
       * @summary 地理位置应用级别开关
       */
      LBS = 'LBS',
      /**
       * @summary 高精度地理位置开关
       * @native 10.0.18
       * @android false
       */
      LBSHIGHACCURACY = 'LBSHIGHACCURACY',
    }
    enum EBeaconDeviceProxiity {
      /**
       * @summary 未知
       */
      _0 = 0,
      /**
       * @summary 极近
       */
      _1 = 1,
      /**
       * @summary 近
       */
      _2 = 2,
      /**
       * @summary 远
       */
      _3 = 3,
    }
    enum ECalculateRouteMode {
      /**
       * @summary 最快捷模式，速度优先（时间）。
       */
      '_0' = 0,
      /**
       * @summary 最经济模式，费用优先（不走收费路段的最快道路）。
       */
      '_1' = 1,
      /**
       * @summary 最少换乘模式，距离优先。
       */
      '_2' = 2,
      /**
       * @summary 最少步行模式，不走快速路。
       */
      '_3' = 3,
      /**
       * @summary 最舒适模式，结合实时交通（躲避拥堵）。
       */
      '_4' = 4,
      /**
       * @summary 不乘地铁模式，多策略（同时使用速度优先、费用优先、距离优先三个策略）。
       */
      '_5' = 5,
      /**
       * @summary 不走高速。
       */
      '_6' = 6,
      /**
       * @summary 不走高速且避免收费。
       */
      '_7' = 7,
      /**
       * @summary 躲避收费和拥堵。
       */
      '_8' = 8,
      /**
       * @summary 不走高速且躲避收费和拥堵。
       */
      '_9' = 9,
    }
    enum ECamera {
      /**
       * @summary 默认拉起后置摄像头。
       */
      back = 'back',
      /**
       * @summary 默认拉起前置摄像头。
       */
      front = 'front',
    }
    enum ECompressImageCompressLevel {
      /**
       * @summary 低质量
       */
      _0 = 0,
      /**
       * @summary 中等质量
       */
      _1 = 1,
      /**
       * @summary 高质量
       */
      _2 = 2,
      /**
       * @summary 不压缩
       */
      _3 = 3,
      /**
       * @summary 根据网络适应
       */
      _4 = 4,
    }
    enum EDepositState {
      /**
       * @summary 支持
       */
      Y = 'Y',
      /**
       * @summary 不支持
       */
      N = 'N',
    }
    enum EGetLocationType {
      /**
       * @summary 获取经纬度
       */
      _0 = 0,
      /**
       * @summary 获取经纬度和详细到区县级别的逆地理编码数据
       */
      _1 = 1,
      /**
       * @summary 获取经纬度和详细到街道级别的逆地理编码数据
       * @description 不推荐使用，精度过高，接口返回的速度会变慢。
       */
      _2 = 2,
      /**
       * @summary 获取经纬度和详细到POI级别的逆地理编码数据
       * @description 不推荐使用，精度过高，接口返回的速度会变慢。
       */
      _3 = 3,
      z = 'bz',
    }
    enum EImageChoosenSizeType {
      /**
       * @summary 原图
       */
      original = 'original',
      /**
       * @summary 压缩图
       */
      compressed = 'compressed',
    }
    enum EImageChoosenSourceType {
      /**
       * @summary 拍照
       */
      camera = 'camera',
      /**
       * @summary 相册选取
       */
      album = 'album',
    }
    enum EInvokeType {
      /**
       * @summary 回跳至小程序地址
       */
      TINYAPP = 'TINYAPP',
      /**
       * @summary 支付宝服务窗
       */
      WINDOWS = 'WINDOWS',
    }
    enum EMemoryWarningLevel {
      /**
       * @summary 低内存告警
       */
      _10 = 10,
      /**
       * @summary 重度内存告警
       */
      _15 = 15,
    }
    enum ENetworkType {
      /**
       * @summary 未知
       */
      UNKNOWN = 'UNKNOWN',
      /**
       * @summary 网络不可用
       */
      NOTREACHABLE = 'NOTREACHABLE',
      /**
       * @summary WiFi
       */
      WIFI = 'WIFI',
      /**
       * @summary 3G
       */
      '3G' = '3G',
      /**
       * @summary 2G
       */
      '2G' = '2G',
      /**
       * @summary 4G
       */
      '4G' = '4G',
      /**
       * @summary WWAN
       */
      WWAN = 'WWAN',
    }
    enum ERentSettleType {
      /**
       * @summary 表示商户自行结算，信用借还不提供租金支付能力
       */
      merchant = 'merchant',
      /**
       * @summary 表示使用支付宝支付功能，给用户提供租金代扣及赔偿金支付能力；
       */
      alipay = 'alipay',
    }
    enum ERentUnit {
      /**
       * @summary 元/天
       */
      'DAY_YUAN' = 'DAY_YUAN',
      /**
       * @summary 元/小时
       */
      'HOUR_YUAN' = 'HOUR_YUAN',
      /**
       * @summary 元
       */
      'YUAN' = 'YUAN',
      /**
       * @summary  元/次
       */
      'YUAN_ONCE' = 'YUAN_ONCE',
    }
    enum EShowActionsheetType {
      /**
       * @summary 显示文本
       */
      text = 'text',
      /**
       * @summary 显示数字, text 为小数或 ≤ 0 均不显示，≥ 100 显示 "•••"
       */
      num = 'num',
      /**
       * @summary 仅显示小红点
       */
      point = 'point',
      /**
       * @summary 显示 "•••"
       */
      more = 'more',
      /**
       * @summary 不显示
       */
      none = 'none',
    }
    enum ESourceType {
      /**
       * @summary 从相册选择视频。
       */
      album = 'album',
      /**
       * @summary 使用相机拍摄视频。
       */
      camera = 'camera',
    }
    enum ESpuName {
      'power_bank' = 'power_bank',
      'umbrella' = 'umbrella',
    }
    enum ESystemInfoPerformance {
      /**
       * @summary 高性能
       * @description
       * - iOS 设备运行内存大于等于 4GB (对应 iPhone Xs 及以上)
       * - Android 设备运行内存大于等于 4GB
       */
      high = 'high',
      /**
       * @summary 性能中等
       * @description
       * - iOS 设备运行内存大于等于 2GB (对应 iPhone 6s ~ iPhone XR)
       * - Android 设备运行内存大于等于 3GB 且 CPU 核心数大于 4
       */
      middle = 'middle',
      /**
       * @summary 性能较弱
       */
      low = 'low',
      /**
       * @summary 无法识别
       * @description
       * 设备运行内存无法识别
       */
      unknown = 'unknown',
    }
    interface IAddOption {
      /**
       * @summary 插入点之上的省份 ID。
       */
      pid: string;
      /**
       * @summary 插入点之下的省份 ID。
       */
      nextId: string;
      /**
       * @summary 增加对象的 ID。
       */
      id: string;
      /**
       * @summary 增加对象的名称。
       */
      name: string;
      /**
       * @summary 省内完整的市和区信息。示例：`"subList": [{ "name": "北京市", "id": "110100", "subList": [{ "name": "东城区", "id": "110101" }]`。
       */
      subList: ISubList[];
    }
    /**
     * @summary 蓝牙设备 characteristic （特征值）信息
     */
    export interface IBLECharacteristic {
      /**
       * @summary 蓝牙设备特征值的 UUID。
       */
      characteristicId: string;
      /**
       * @summary 蓝牙设备特征值对应服务的 UUID。
       */
      serviceId: string;
      /**
       * @summary 蓝牙设备特征值对应的 16 进制值。
       */
      value: string;
      /**
       * @summary 该特征值支持的操作类型。
       */
      properties?: IBLEProperties;
    }
    interface IBLEProperties {
      /**
       * @summary 该特征值是否支持 read 操作。
       */
      read: boolean;
      /**
       * @summary 该特征值是否支持 write 操作。
       */
      write: boolean;
      /**
       * @summary 该特征值是否支持 notify 操作。
       */
      notify: boolean;
      /**
       * @summary 该特征值是否支持 indicate 操作。
       */
      indicate: boolean;
    }
    /**
     * @summary 设备服务。
     */
    interface IBLEService {
      /**
       * @summary 蓝牙设备特征值对应服务的 UUID。
       */
      serviceId: string;
      /**
       * @summary 该服务是否为主服务。
       * - `true` 为主服务。
       * - `false` 不是主服务。
       */
      isPrimary: boolean;
    }
    interface IBeacon {
      rssi: number;
      major: number;
      minor: number;
      proximity: number;
      accuracy: number;
      uuid: string;
      /**
       * @summary iOS 13.0+
       */
      timestamp?: number;
    }
    interface IBeaconDevice {
      /**
       * @summary iBeacon 设备广播的 UUID。
       */
      uuid: string;
      /**
       * @summary iBeacon 设备的主 ID。
       */
      major: string;
      /**
       * @summary iBeacon 设备的次 ID。
       */
      minor: string;
      /**
       * @summary 表示设备距离的估计值
       */
      proximity: EBeaconDeviceProxiity;
      /**
       * @summary iBeacon 设备的距离。
       */
      accuracy: string;
      /**
       * @summary iBeacon 信号强度。
       */
      rssi: string;
    }
    interface IBluetoothDevice {
      /**
       * @summary 蓝牙设备名称（某些设备可能没有）。
       */
      name: string;
      /**
       * @summary 低版本客户端提供，与 name 一致
       */
      deviceName: string;
      /**
       * @summary 广播设备名称。
       */
      localName: string;
      /**
       * @summary 设备 ID。Android 上为设备 MAC 地址，iOS 上为设备 UUID。需要分平台处理，iOS 可根据设备属性（ localName / advertisData / manufacturerData 等属性）进行动态匹配
       */
      deviceId: string;
      /**
       * @summary 设备信号强度。
       */
      RSSI: string;
      /**
       * @summary 设备的广播内容。为 16 进制Hex字符串
       */
      advertisData: string;
      /**
       * @summary 设备的 manufacturerData。为 16 进制Hex字符串
       */
      manufacturerData: string;
    }
    export interface ICharacteristicRequest {
      /**
       * @summary 特征值 id。
       */
      id: string;
      /**
       * @summary 特征值属性。
       */
      properties: Array<'write' | 'write_no_response' | 'read' | 'notify'>;
    }
    interface ICity {
      /**
       * @summary 城市名。
       */
      city: string;
      /**
       * @summary 行政区划代码。不同行政区域对应的代码可参见 中华人民共和国县以上行政区划代码。
       */
      adCode: string;
      /**
       * @summary 城市名对应拼音拼写，方便用户搜索。
       */
      spell: string;
    }
    interface IContacts4ChooseAlipayContact {
      /**
       * @summary 账号的真实姓名。
       */
      realName: string;
      /**
       * @summary 账号的头像链接。
       */
      avatar: string;
      /**
       * @summary 账号的邮箱
       */
      email?: string;
      /**
       * @summary 支付宝账号唯一标识符
       */
      userId: string;
      /**
       * @summary 账号对应的手机号码
       * @description
       * 请在手机端开启支付宝客户端 APP 的通讯录权限，否则可能出现获取不到手机号码的情况。
       * 手机本地系统通讯录号码需要与支付宝好友手机号码一致，否则可能出现获取不到手机号码的情况。
       */
      mobile?: string;
      from?: never;
    }
    interface IContactsDic4ChooseContact {
      /**
       * @summary 支付宝账号唯一标识符。
       */
      userId: string;
      /**
       * @summary 账号的头像链接。
       */
      avatar: string;
      /**
       * @summary 账号对应的手机号码。
       * @description
       * 请在手机端开启支付宝客户端 APP 的通讯录权限，否则可能出现获取不到手机号码的情况。
       * 手机本地系统通讯录号码需要与支付宝好友手机号码一致，否则可能出现获取不到手机号码的情况。
       */
      mobile: string;
      /**
       * @summary 账号的真实姓名。
       */
      realName: string;
      /**
       * @summary 账号的显示名称，即支付宝设置的备注名称，默认为朋友圈里面的昵称。
       */
      displayName: string;
      account?: never;
    }
    /**
     * @summary 自定义菜单列表
     */
    interface ICustomMenuItem {
      /**
       * @summary 自定义菜单名称
       */
      name: string;
      /**
       * @summary 自定义菜单的 icon URL，大小64x64
       */
      menuIconUrl: string;
    }
    interface IFileInfo {
      size: number;
      apFilePath: string;
      createTime: number;
    }
    export interface ILaunchOptions {
      /**
       * @summary 启动小程序的路径
       */
      path?: string;
      /**
       * @summary 当前小程序的 query，从启动参数的 query 字段解析而来
       */
      query?: Record<string, unknown>;
      /**
       * @summary 来源信息
       * @description 部分版本在无 referrerInfo 的时候会返回 undefined，建议使用 options.referrerInfo && options.referrerInfo.appId 进行判断
       */
      referrerInfo?: IReferrerInfo;
      /**
       * @summary 启动小程序的 [场景值](https://opendocs.alipay.com/mini/framework/scene)
       */
      scene?: number;
    }
    interface IListItem {
      name: string;
      subList: IListItem[];
    }
    interface ILocation {
      /**
       * @summary 纬度。
       */
      latitude: number;
      /**
       * @summary 经度。
       */
      longitude: number;
    }
    interface IOptionMenu {
      title?: string;
      icontype?: string;
      icon?: string;
      iconfont?: string;
      contentDesc?: string;
      color?: string;
      /**
       * @summary
       * - "-1" 不显示
       * - "0" 显示红点
       * - "数字" 在红点上显示的数字
       */
      redDot?: '-1' | '0' | string;
    }
    interface IPoi {
      /**
       * @summary poi名称。
       */
      number: string;
      /**
       * @summary poi地址。
       */
      address: string;
    }
    export interface IPreloadCanvasImageLoadData {
      /**
       * @summary 图片ID
       * @description
       * - 加载失败时为 `-1`
       */
      id: string | number | -1;
      /**
       * @summary 图片宽度
       * @description
       * - 加载失败时为 `-1`
       */
      width: number;
      /**
       * @summary 图片高度
       * @description
       * - 加载失败时为 `-1`
       */
      height: number;
      /**
       * @summary 图片URL
       */
      url: string;
    }
    interface IProduct {
      amount: string;
      count: number;
      name: string;
    }
    interface IReferrerInfo {
      /**
       * @summary 来源小程序。
       */
      appId: string;
      /**
       * @summary 以小服务模式启动的来源信息，目前已废弃
       * @deprecated
       */
      sourceServiceId?: string;
      /**
       * @summary 来源小程序传过来的数据。
       */
      extraData: Record<string, unknown>;
    }
    interface IRemoveOption {
      /**
       * @summary 需要移除的省份 ID。
       */
      id: string;
    }
    export interface IShowActionSheetBadge {
      /**
       * @summary 需要飘红的选项的索引，从 0 开始
       */
      index: number;
      /**
       * @summary 飘红类型
       * @default "none"
       */
      type: `${EShowActionsheetType}`;
      /**
       * @summary type 为 'text', 'num' 时的内容
       */
      text: string;
    }
    interface IStreetNumber {
      /**
       * @summary 街道 number。
       */
      number: string;
      /**
       * @summary 街道名称。
       */
      street: string;
    }
    interface ISubList {
      /**
       * @summary 名称
       */
      name: string;
      /**
       * @summary ud
       */
      id: string;
    }
    interface ITargetPoint {
      /**
       * @summary 与 points 数组中首个点的直线距离符合目标距离的点，在 targetDistances 中的索引。
       */
      index: number;
      /**
       * @summary 目标距离的数值。（如果不传 targetPoints 或 targetPoints 参数为空，则返回的 targetDistances字段也为空。）
       */
      targetDistance: number;
      /**
       * @summary 纬度。
       */
      latitude: number;
      /**
       * @summary 经度。
       */
      longitude: number;
      /**
       * @summary 假设 points 数组为 [A,B,C]，符合目标距离的点为 B'， 且 B'- A 直线距离在 B-A 直线距离、C-A 直线距离之间，则 targetLineIndex 为 points 数组中的点 B 的索引数值。
       */
      targetLineIndex: number;
    }
    interface IThroughPoint {
      /**
       * @summary 纬度。
       */
      lat: number;
      /**
       * @summary 经度。
       */
      lng: number;
    }
    interface IUpdateOption {
      /**
       * @summary 更新对象的 ID。
       */
      id: string;
      /**
       * @summary 增加对象的名称。
       */
      name: string;
      /**
       * @summary 省内完整的市和区信息。示例：`"subList": [{ "name": "北京市", "id": "110100", "subList": [{ "name": "东城区", "id": "110101" }]`。
       */
      subList: ISubList[];
    }
    interface IWifiInfo {
      /**
       * @summary Wifi 的 SSID。
       */
      SSID: string;
      /**
       * @summary Wifi 的 BSSID。
       */
      BSSID: string;
      /**
       * @summary Wifi 是否安全。
       */
      secure: boolean;
      /**
       * @summary Wifi 信号强度。
       */
      signalStrength: number;
    }
    interface IWifiInfo4SetWifiList {
      /**
       * @summary Wifi 的 SSID。
       */
      SSID: string;
      /**
       * @summary Wifi 的 BSSID。
       */
      BSSID: string;
      /**
       * @summary Wifi 的设备密码。
       */
      password: string;
    }
    /**
     * @summary 跳转到地图页面。
     */
    interface IZmCreditBorrowRequest4OpenZMCreditBorrowMapPage {
      /**
       * @summary 仅跳转到地图页面时才存在该属性，值必须为 'map'。
       */
      borrowPage: string;
      /**
       * @summary 仅跳转到地图页面时存在该属性。要展示的类目。
       */
      spuName: `${ESpuName}`;
    }
    /**
     * @summary 唤起芝麻信用页面参数。
     */
    interface IZmCreditBorrowRequest4OpenZMCreditBorrowPage {
      /**
       * @summary 外部订单号，需要唯一，由商户传入，芝麻内部会做幂等控制，格式为：yyyyMMddHHmmss+随机数
       */
      out_order_no: string;
      /**
       * @summary 信用借还的产品码，传入固定值：w1010100000000002858
       */
      product_code: string;
      /**
       * @summary 物品名称，最长不能超过14个汉字。
       */
      goods_name: string;
      /**
       * @summary 租金单位，租金+租金单位组合才具备实际的租金意义。
       */
      rent_unit: `${ERentUnit}`;
      /**
       * @summary 租金，租金+租金单位组合才具备实际的租金意义。 >0.00元，代表有租金 =0.00元，代表无租金，免费借用 注：参数传值必须>=0，传入其他值会报错参数非法
       */
      rent_amount: string;
      /**
       * @summary 押金，金额单位：元。 注：不允许免押金的用户按此金额支付押金；当物品丢失时，赔偿金额不得高于该金额。
       */
      deposit_amount: string;
      /**
       * @summary 是否支持当借用用户信用不够（不准入）时，可让用户支付押金借用，该字段目前默认传 Y，注：支付押金的金额等同于 `deposit_amount`。
       */
      deposit_state: `${EDepositState}`;
      /**
       * @summary 回调到商户的小程序schema地址。说明：商户的回调地址可以在商户后台里进行配置，服务端回调时，首先根据参数：invoke_type 查询是否有对应的配置地址，如果有，则使用已定义的地址，否则，使用该字段定义的地址执行回调。
       */
      invoke_return_url: string;
      /**
       * @summary 商户访问蚂蚁的对接模式，默认传 TINYAPP。
       * - TINYAPP：回跳至小程序地址
       * - WINDOWS：支付宝服务窗
       */
      invoke_type: `${EInvokeType}`;
      /**
       * @summary 信用业务服务，注意：该字段不能为空，且必须根据说明的指引配置商户专属的场景ID，商户自助接入时，登录后台可配置场景ID，将后台配置的场景ID作为该字段的输入； 参考说明一自助进行配置；
       */
      credit_biz: string;
      /**
       * @summary 商户订单创建的起始借用时间，格式：`YYYY-MM-DD HH:MM:SS`。如果不传入或者为空，则认为订单创建起始时间为调用此接口时的时间。
       */
      borrow_time?: string;
      /**
       * @summary 到期时间，不允许为空，请根据实际业务合理设置该值，格式：`YYYY-MM-DD HH:MM:SS`，是指最晚归还时间，表示借用用户如果超过此时间还未完结订单（未归还物品或者未支付租金）将会进入逾期状态，芝麻会给借用用户发送催收提醒；需要晚于 `borrow_time`。
       */
      expiry_time: string;
      /**
       * @summary 借用用户的手机号码。推荐商户传入此值，会将此手机号码与用户身份信息进行匹配验证，防范欺诈风险。
       */
      mobile_no?: string;
      /**
       * @summary 物品借用地点的描述，便于用户知道物品是在哪里借的。
       */
      borrow_shop_name?: string;
      /**
       * @summary 租金的结算方式，非必填字段，默认是支付宝租金结算支付。
       * - merchant：表示商户自行结算，信用借还不提供租金支付能力
       * - alipay：表示使用支付宝支付功能，给用户提供租金代扣及赔偿金支付能力；
       * @default 'alipay'
       */
      rent_settle_type?: `${ERentSettleType}`;
      /**
       * @summary 商户请求状态上下文。商户发起借用服务时，需要在借用结束后返回给商户的参数，格式：json； 如果json的某一项值包含中文，请使用 encodeURIComponent 对该值进行编码。
       * - 例如：`var ext = { name: encodeURIComponent('名字') }; var obj = { invoke_state: JSON.stringify(ext) }`
       */
      invoke_state?: string;
      /**
       * @summary 租金信息描述，长度不超过14个汉字，只用于页面展示给C端用户，除此之外无其他意义。
       */
      rent_info?: string;
      /**
       * @summary 借用用户的真实姓名，非必填字段。但 `name` 和 `cert_no` 必须同时非空，或者同时为空，一旦传入会对用户身份进行校验。
       */
      name?: string;
      /**
       * @summary 借用用户的真实身份证号，非必填字段。但 `name` 和 `cert_no` 必须同时非空，或者同时为空，一旦传入会对用户身份进行校验。
       */
      cert_no?: string;
      /**
       * @summary 借用用户的收货地址，可选字段，最大长度128。推荐商户传入此值，会将此手机号码与用户身份信息进行匹配验证，防范欺诈风险。
       */
      address?: string;
    }
  }
  