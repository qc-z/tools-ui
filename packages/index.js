// import getPath from '../utils/getFilePath';
import Button from './button'
import Input from './input'
const components = [Button, Input]
const output = {}
components.forEach(item => (output[item.name] = item))
export default output
