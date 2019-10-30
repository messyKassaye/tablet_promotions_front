import en from './en'
import am from './am'
import homeEN from '../../home/locales/en'
import homeAM from '../../home/locales/am'
import driverEN from '../../authentication/drivers/locales/en'
import driverAM from '../../authentication/drivers/locales/am'
import commonEN from '../../authentication/commons/locales/en'
import commonAM from '../../authentication/commons/locales/am'
import advertiserEN from '../../authentication/advertisers/locales/en'
import advertiserAM from '../../authentication/advertisers/locales/am'

en['en'].driver = driverEN['en']
am['am'].driver = driverAM['am']
en['en'].common = commonEN['en']
am['am'].common = commonAM['am']
en['en'].advertiser = advertiserEN['en']
am['am'].advertiser = advertiserAM['am']
en['en'].home = homeEN['en']
am['am'].home = homeAM['am']

export {en,am}