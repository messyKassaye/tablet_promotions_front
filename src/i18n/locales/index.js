import en from './en'
import am from './am'
import homeEN from '../../home/locales/en'
import homeAM from '../../home/locales/am'
import driverEN from '../../authentication/carOwners/locales/en'
import driverAM from '../../authentication/carOwners/locales/am'
import commonEN from '../../authentication/commons/locales/en'
import commonAM from '../../authentication/commons/locales/am'
import dialogAM from '../../authentication/admin/dialogs/locales/am'
import dialogEN from '../../authentication/admin/dialogs/locales/en'
import advertiserEN from '../../authentication/advertisers/locales/en'
import advertiserAM from '../../authentication/advertisers/locales/am'

en['en'].driver = driverEN['en']
am['am'].driver = driverAM['am']
en['en'].common = commonEN['en']
am['am'].common = commonAM['am']
en['en'].advertiser = advertiserEN['en']
am['am'].advertiser = advertiserAM['am']
am['am'].dialog = dialogAM['am']
en['en'].dialog = dialogEN['en']
en['en'].home = homeEN['en']
am['am'].home = homeAM['am']

export {en,am}
