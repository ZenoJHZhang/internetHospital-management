import axios from 'axios'
import {
  objBase,
  modelBase
} from './config'


const post = (_url, obj) => axios.post(_url, obj, objBase)
const post2 = (_url, body) => axios.post(_url, body, modelBase)
const get = (_url) => axios.get(_url, objBase)
export default {

}