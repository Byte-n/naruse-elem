import View from '../components/view/index';
import Text from '../components/text/index';
import Image from '../components/image/index';
import { ScrollView, TextInput } from 'rax-components';


/** 组件映射表 */
export const componentReflectMap: Record<string, any> = {
    view: View,
    text: Text,
    image: Image,
    'scroll-view': ScrollView,
    input: TextInput,
};