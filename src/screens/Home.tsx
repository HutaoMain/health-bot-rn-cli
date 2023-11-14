import {SafeAreaView} from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Navbar />
    </SafeAreaView>
  );
};

export default Home;
