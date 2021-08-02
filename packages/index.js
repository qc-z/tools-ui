// 此文件由 build/bin/build-entry.js生成
import Button from './button';
import Input from './input';

const components = [Button, Input];
const output = {};
components.forEach(item => (output[item.name] = item));
export default output;
