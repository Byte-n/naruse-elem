import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import styles from './index.module.css';
import Logo from '@/components/Logo';
import { createElement as naruseCreateElement } from '../../../../../package/naruse-weex/build/lib'

export default function Home() {
  return (
    <View className={styles.homeContainer}>
      <Text className={styles.homeTitle}>Welcome to Your Rax App</Text>
      {naruseCreateElement('text', { style: { height: '200rpx', backgroundColor: 'red', fontSize: '50rpx' }, selectable: true, onClick: () => {
        console.log(123);
      }  }, '123')}
    </View>
  );
}
