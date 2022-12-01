import View from './view/index';
import Text from './text/index';
import Image from './image/index';
import { ScrollView, TextInput } from 'rax-components';


/** 组件映射表 */
export const componentReflectMap: Record<string, any> = {
    view: View,
    text: Text,
    image: Image,
    'scroll-view': ScrollView,
    input: TextInput,
};