import SuccessPC from '@components/oneGoConfirmBuyDialog/successPC.js';
import SuccessItem from '@components/oneGoConfirmBuyDialog/successItem.js';
import SuccessMB from '@components/oneGoConfirmBuyDialog/successMB.js';
import Error from '@components/oneGoConfirmBuyDialog/error.js';
import { Component, navigateToWebPage } from 'Naruse';

export default class upperRightFlagDialogDemo extends Component {
    constructor () {
        this.state = { dialogVisible: true };
    }

    closeDialog () {
        const url = 'qwer';
        navigateToWebPage({ url });
        $adImport.uninstall();
        this.setState({ dialogVisible: false });
    }

    render () {
        return (<view>
            {/* <SuccessPCcloseBtnName={'关闭按钮1'}/> */}
            {/* <SuccessMB closeBtnName={'关闭按钮2'}/> */}
            <SuccessItem isPc={ true } closeBtnName={'关闭按钮2'}/>
            {/* <Error onCustomerService={() => { console.log('onCustomerService');}} onAgain={() => { console.log('onAgain');}} closeBtnName={'关闭按钮1'}/> */}
        </view>);
    }
}
