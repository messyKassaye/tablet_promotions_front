import en from './en'
import am from './am'
import homeEN from '../../home/locales/en'
import homeAM from '../../home/locales/am'
import driverEN from '../../authentication/drivers/locales/en'
import driverAM from '../../authentication/drivers/locales/am'

en['en'].driver = driverEN['en']
am['am'].driver = driverAM['am']
en['en'].home = homeEN['en']
am['am'].home = homeAM['am']

export {en,am}