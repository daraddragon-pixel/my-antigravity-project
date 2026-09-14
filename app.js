/**
 * The Daily Chronograph - Core Application Logic
 * Interactive newspaper operations, bookmarking, searching, speech synthesis, and animations.
 * Extended with Khmer language translation support.
 */

// --- Translation Dictionary ---
const TRANSLATIONS = {
    en: {
        mastheadTitle: "<span class='brand-color'>ANR</span> DAILY NEWS",
        volNo: "VOL. CXXIV NO. 42",
        price: "PRICE: ONE BIT",
        est: "EST. 1902",
        savedArticles: "SAVED ARTICLES",
        nightEdition: "NIGHT EDITION",
        dayEdition: "DAY EDITION",
        bulletins: "BULLETINS",
        find: "FIND",
        searchPlaceholder: "Search archive...",
        latestFlashes: "LATEST FLASHES",
        opinionEditorial: "OPINION & EDITORIAL",
        meteorologicalStamp: "METEOROLOGICAL STAMP",
        update: "UPDATE",
        enterCityPlaceholder: "Enter city...",
        subscribeDispatch: "SUBSCRIBE TO THE INKED DISPATCH",
        deliveredMailbox: "DELIVERED TO YOUR VIRTUAL MAILBOX DAILY.",
        emailPlaceholder: "typewriter@address.com",
        engrave: "ENGRAVE",
        footerLogo: "<span class='brand-color'>ANR</span> DAILY NEWS",
        footerDesc: "Designed for the digital age, styled for the printed page. All articles are generated for design validation and sample illustration purposes.",
        copyright: "© 2026 CHRONOGRAPH MEDIA INC. ALL RIGHT OR WRONG RESERVED.",
        emptyArchive: "EMPTY ARCHIVE",
        noCorrespondence: "NO CORRESPONDENCE FOUND",
        emptyDesc: "Our telegram operators search the files but found nothing matching. Adjust your filters or query term to retrieve archived articles.",
        readDispatch: "READ DISPATCH",
        speak: "SPEAK",
        stop: "STOP",
        save: "SAVE",
        unsave: "UNSAVE",
        print: "PRINT",
        endOfTelegram: "END OF TELEGRAM — THE DAILY CHRONOGRAPH",
        toastBookmarked: "ARTICLE ARCHIVED LOCALLY",
        toastUnbookmarked: "ARTICLE REMOVED FROM ARCHIVE",
        toastTtsUnsupported: "SPEECH SYNTHESIS NOT SUPPORTED IN BROWSER",
        weatherUpdate: "TELEGRAPH RECEIVED: WEATHER UPDATED FOR ",
        subscribing: "ENGRAVING DISPATCH RECORD...",
        subscribedAt: "SUBSCRIBED AT ADDRESS: ",
        subscribedToast: "SUBSCRIBED SUCCESSFULLY. RECORD ENGRAVED.",
        approved: "APPROVED",
        by: "BY",
        words: "WORDS",
        readTime: "MIN READ",
        adTitle: "THE CHRONOGRAPH CO.",
        adBody: "FINE INKS & STATIONERY",
        adSub: "Est. 1888 — Pure Quality",
        fontIncTitle: "Increase Font Size",
        fontDecTitle: "Decrease Font Size",
        closeModal: "Close modal",
        weatherIconCloud: "☁",
        weatherIconSun: "☼",
        weatherIconStorm: "⛈",
        weatherIconFrost: "❄",
        nav: {
            all: "FRONT PAGE",
            world: "WORLD",
            technology: "TECHNOLOGY",
            culture: "CULTURE",
            opinion: "OPINION",
            saved: "SAVED"
        }
    },
    km: {
        mastheadTitle: "ព័ត៌មានប្រចាំថ្ងៃរបស់ <span class='brand-color'>អេអ៊ិនអរ</span>",
        volNo: "លេខ. CXXIV លេខរៀង ៤២",
        price: "តម្លៃ៖ ១ ប៊ីត",
        est: "បង្កើតឡើងឆ្នាំ ១៩០២",
        savedArticles: "អត្ថបទដែលបានរក្សាទុក",
        nightEdition: "កែសម្រួលពេលរាត្រី",
        dayEdition: "កែសម្រួលពេលថ្ងៃ",
        bulletins: "ព្រឹត្តិបត្រព័ត៌មាន",
        find: "ស្វែងរក",
        searchPlaceholder: "ស្វែងរកបណ្ណសារ...",
        latestFlashes: "ព័ត៌មានទាន់ហេតុការណ៍",
        opinionEditorial: "មតិយោបល់ និង វិចារណកថា",
        meteorologicalStamp: "ស្ថានភាពអាកាសធាតុ",
        update: "ធ្វើបច្ចុប្បន្នភាព",
        enterCityPlaceholder: "បញ្ចូលឈ្មោះទីក្រុង...",
        subscribeDispatch: "ចុះឈ្មោះជាវព្រឹត្តិបត្រព័ត៌មាន",
        deliveredMailbox: "ផ្ញើទៅកាន់ប្រអប់សំបុត្រនិម្មិតរបស់អ្នកជារៀងរាល់ថ្ងៃ។",
        emailPlaceholder: "typewriter@address.com",
        engrave: "ចុះឈ្មោះ",
        footerLogo: "ព័ត៌មានប្រចាំថ្ងៃរបស់ <span class='brand-color'>អេអ៊ិនអរ</span>",
        footerDesc: "រចនាឡើងសម្រាប់យុគ្គសម័យឌីជីថល រៀបចំឡើងសម្រាប់ទំព័របោះពុម្ព។ អត្ថបទទាំងអស់ត្រូវបានបង្កើតឡើងសម្រាប់សុពលភាពរចនា និងគោលបំណងបង្ហាញគំរូតែប៉ុណ្ណោះ។",
        copyright: "© ២០២៦ ក្រុមហ៊ុនប្រព័ន្ធផ្សព្វផ្សាយកាលប្បវត្តិ។ រក្សាសិទ្ធិគ្រប់យ៉ាង។",
        emptyArchive: "បណ្ណសារទទេ",
        noCorrespondence: "រកមិនឃើញអត្ថបទដែលត្រូវគ្នាឡើយ",
        emptyDesc: "ប្រតិបត្តិករទូរលេខរបស់យើងបានស្វែងរកឯកសារ ប៉ុន្តែរកមិនឃើញអ្វីដែលត្រូវគ្នាឡើយ។ សូមកែសម្រួលតម្រង ឬពាក្យស្វែងរករបស់អ្នកឡើងវិញ។",
        readDispatch: "អានព័ត៌មាន",
        speak: "អានឮៗ",
        stop: "បញ្ឈប់",
        save: "រក្សាទុក",
        unsave: "លុបចេញ",
        print: "បោះពុម្ព",
        endOfTelegram: "ចប់ទូរលេខ — កាលប្បវត្តិប្រចាំថ្ងៃ",
        toastBookmarked: "បានរក្សាទុកអត្ថបទក្នុងបណ្ណសារមូលដ្ឋាន",
        toastUnbookmarked: "បានលុបអត្ថបទចេញពីបណ្ណសារមូលដ្ឋាន",
        toastTtsUnsupported: "កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រមុខងារអានឮៗឡើយ",
        weatherUpdate: "ទូរលេខបានទទួល៖ អាកាសធាតុត្រូវបានធ្វើបច្ចុប្បន្នភាពសម្រាប់ ",
        subscribing: "កំពុងកត់ត្រាការជាវ...",
        subscribedAt: "បានជាវនៅអាសយដ្ឋាន៖ ",
        subscribedToast: "បានជាវដោយជោគជ័យ។ កំណត់ត្រាត្រូវបានរក្សាទុក។",
        approved: "បានអនុម័ត",
        by: "ដោយ",
        words: "ពាក្យ",
        readTime: "នាទីអាន",
        adTitle: "ក្រុមហ៊ុន កាលប្បវត្តិ",
        adBody: "ទឹកខ្មៅ និង គ្រឿងសរសេរគុណភាពខ្ពស់",
        adSub: "បង្កើតឆ្នាំ ១៨៨៨ — គុណភាពពិតៗ",
        fontIncTitle: "បង្កើនទំហំអក្សរ",
        fontDecTitle: "បន្ថយទំហំអក្សរ",
        closeModal: "បិទផ្ទាំងនេះ",
        weatherIconCloud: "☁",
        weatherIconSun: "☼",
        weatherIconStorm: "⛈",
        weatherIconFrost: "❄",
        nav: {
            all: "ទំព័រមុខ",
            world: "ពិភពលោក",
            technology: "បច្ចេកវិទ្យា",
            culture: "វប្បធម៌",
            opinion: "មតិយោបល់",
            saved: "បានរក្សាទុក"
        }
    }
};

// --- Localized Article Mock Database ---
const ARTICLES_DB = [
  {
    "id": "world-1",
    "category": "world",
    "author": "ALISTAIR CROFT",
    "date": "JULY 11, 2026",
    "dateKm": "១១ កក្កដា ២០២៦",
    "wordCount": "1,450 WORDS",
    "wordCountKm": "១,៤៥០ ពាក្យ",
    "readTime": "6 MIN READ",
    "readTimeKm": "៦ នាទីអាន",
    "image": "assets/images/world_map_vintage.png",
    "en": {
      "title": "TRANS-PACIFIC DIPLOMATIC ACCORD SIGNED IN KYOTO",
      "subtitle": "Delegations from twenty maritime states ratify sweeping maritime trade boundaries.",
      "preview": "In an unprecedented midnight plenary session beneath Kyoto's cedar lanterns, representatives of twenty Pacific littoral powers formally stamped and sealed the Great Maritime Protocol of 2026.",
      "content": "In an unprecedented midnight plenary session beneath Kyoto's cedar lanterns, representatives of twenty Pacific littoral powers formally stamped and sealed the Great Maritime Protocol of 2026.<br><br>The agreement establishes demilitarized open sea-lanes stretching from Yokohama to Valparaíso, ensuring neutral transit for civilian merchant zeppelins and autonomous hydrofoil cargo vessels alike. Chief negotiator Baroness Helena Rostova emphasized the triumph of mutual pacts over commercial isolationism.<br><br>Under the terms of the charter, deep-water undersea sensor grids will be monitored by an international neutral registry headquartered in Singapore, eliminating maritime territorial disputes that have persisted for over three decades."
    },
    "km": {
      "title": "កិច្ចព្រមព្រៀងការទូតឆ្លងមហាសមុទ្រប៉ាស៊ីហ្វិកត្រូវបានចុះហត្ថលេខានៅក្យូតូ",
      "subtitle": "គណៈប្រតិភូមកពីប្រទេសជាប់ឆ្នេរសមុទ្រចំនួនម្ភៃបានផ្តល់សច្ចាប័នលើព្រំដែនពាណិជ្ជកម្មដែនសមុទ្រដ៏ទូលំទូលាយ។",
      "preview": "នៅក្នុងកិច្ចប្រជុំពេញអង្គពាក់កណ្តាលអធ្រាត្រដែលមិនធ្លាប់មានពីមុនមក តំណាងនៃមហាអំណាចតំបន់ប៉ាស៊ីហ្វិកចំនួន ២០ បានបោះត្រានិងចុះហត្ថលេខាជាផ្លូវការលើពិធីសារដែនសមុទ្រឆ្នាំ ២០២៦។",
      "content": "នៅក្នុងកិច្ចប្រជុំពេញអង្គពាក់កណ្តាលអធ្រាត្រដែលមិនធ្លាប់មានពីមុនមក តំណាងនៃមហាអំណាចតំបន់ប៉ាស៊ីហ្វិកចំនួន ២០ បានបោះត្រានិងចុះហត្ថលេខាជាផ្លូវការលើពិធីសារដែនសមុទ្រឆ្នាំ ២០២៦។<br><br>កិច្ចព្រមព្រៀងនេះបង្កើតផ្លូវសមុទ្របើកចំហគ្មានយោធាដែលលាតសន្ធឹងពីទីក្រុងយ៉ូកូហាម៉ាទៅកាន់ទីក្រុងវ៉ាល់ប៉ារ៉ៃសូ ដោយធានាបាននូវការដឹកជញ្ជូនអព្យាក្រឹតសម្រាប់ទាំងកប៉ាល់ដឹកទំនិញស៊ីវិល និងនាវាដឹកជញ្ជូនស្វ័យប្រវត្តិ។ ប្រធានចរចាបានសង្កត់ធ្ងន់លើជ័យជម្នះនៃកតិកាសញ្ញាទៅវិញទៅមកលើភាពឯកោផ្នែកពាណិជ្ជកម្ម។<br><br>ក្រោមលក្ខខណ្ឌនៃធម្មនុញ្ញ បណ្តាញឧបករណ៍ចាប់សញ្ញាក្រោមបាតសមុទ្រជ្រៅនឹងត្រូវបានត្រួតពិនិត្យដោយការិយាល័យអព្យាក្រឹតអន្តរជាតិដែលមានទីស្នាក់ការនៅប្រទេសសិង្ហបុរី ដែលបញ្ចប់ជម្លោះដែនសមុទ្រដែលមានជាយូរមកហើយ។"
    }
  },
  {
    "id": "world-2",
    "category": "world",
    "author": "VALENTINA MOROZOV",
    "date": "JULY 10, 2026",
    "dateKm": "១០ កក្កដា ២០២៦",
    "wordCount": "1,100 WORDS",
    "wordCountKm": "១,១០០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/zeppelin_routes.png",
    "en": {
      "title": "ARCTIC AERO-CORRIDORS EXPAND COMMERCIAL TRANSIT",
      "subtitle": "Direct polar zeppelin freight routes cut delivery duration between Europe and Asia by forty percent.",
      "preview": "High above the frozen expanses of the Barents Sea, the newly certified Polar Fleet has commenced scheduled cargo flights connecting Rotterdam and Osaka.",
      "content": "High above the frozen expanses of the Barents Sea, the newly certified Polar Fleet has commenced scheduled cargo flights connecting Rotterdam and Osaka.<br><br>Powered by hydrogen-electric turbines and utilizing stratospheric thermal jetstreams, these quiet giants traverse the great circle route in just under 48 hours without producing sulfur emissions. Port authorities in Rotterdam reported record turnarounds during the maiden voyage."
    },
    "km": {
      "title": "ច្រករបៀងអាកាសអាក់ទិកពង្រីកការដឹកជញ្ជូនពាណិជ្ជកម្ម",
      "subtitle": "ផ្លូវហោះហើរដឹកទំនិញតាមតំបន់ប៉ូលដោយផ្ទាល់បានកាត់បន្ថយរយៈពេលដឹកជញ្ជូនរវាងអឺរ៉ុបនិងអាស៊ីរហូតដល់ ៤០ ភាគរយ។",
      "preview": "នៅលើដែនអាកាសនៃសមុទ្របារ៉ែន នាវាអាកាសដឹកជញ្ជូនតំបន់ប៉ូលដែលទើបតែទទួលបានការអនុញ្ញាត បានចាប់ផ្តើមជើងហោះហើរតាមកាលវិភាគតភ្ជាប់ទីក្រុងរ៉ូតទ័រដាម និងអូសាកា។",
      "content": "នៅលើដែនអាកាសនៃសមុទ្របារ៉ែន នាវាអាកាសដឹកជញ្ជូនតំបន់ប៉ូលដែលទើបតែទទួលបានការអនុញ្ញាត បានចាប់ផ្តើមជើងហោះហើរតាមកាលវិភាគតភ្ជាប់ទីក្រុងរ៉ូតទ័រដាម និងអូសាកា។<br><br>ដោយប្រើប្រាស់ម៉ាស៊ីនទួរប៊ីនអ៊ីដ្រូសែន-អគ្គិសនី និងចរន្តខ្យល់ក្នុងស្រទាប់បរិយាកាស នាវាដ៏ធំស្ងប់ស្ងាត់ទាំងនេះបានធ្វើដំណើរតាមផ្លូវកាត់ដោយចំណាយពេលត្រឹមតែក្រោម ៤៨ ម៉ោង ដោយគ្មានការបំភាយឧស្ម័នស្ពាន់ធ័រឡើយ។"
    }
  },
  {
    "id": "world-3",
    "category": "world",
    "author": "THOMAS THORNE",
    "date": "JULY 09, 2026",
    "dateKm": "០៩ កក្កដា ២០២៦",
    "wordCount": "950 WORDS",
    "wordCountKm": "៩៥០ ពាក្យ",
    "readTime": "4 MIN READ",
    "readTimeKm": "៤ នាទីអាន",
    "image": "assets/images/world_map_vintage.png",
    "en": {
      "title": "GENEVA CONFERENCE ON GLOBAL GRAIN SECURITY",
      "subtitle": "Agricultural ministers adopt standardized climate-resilient seed exchange treaties.",
      "preview": "Envoys from fifty-six agrarian nations gathered at the Palais des Nations to establish a unified open-source genetic grain depository.",
      "content": "Envoys from fifty-six agrarian nations gathered at the Palais des Nations to establish a unified open-source genetic grain depository.<br><br>The treaty prohibits speculative commodities hoarding of heritage cereals and provides drought-resistant millet and spelt seeds freely to farming cooperatives worldwide. Delegates praised the treaty as a historic victory against famine speculation."
    },
    "km": {
      "title": "សន្និសីទទីក្រុងហ្សឺណែវស្តីពីសន្តិសុខគ្រាប់ធញ្ញជាតិសកល",
      "subtitle": "រដ្ឋមន្ត្រីកសិកម្មអនុម័តសន្ធិសញ្ញាផ្លាស់ប្តូរពូជគ្រាប់ធញ្ញជាតិដែលធន់នឹងអាកាសធាតុ។",
      "preview": "បេសកជនមកពីប្រទេសកសិកម្មចំនួន ៥៦ បានជួបប្រជុំគ្នានៅទីក្រុងហ្សឺណែវ ដើម្បីបង្កើតឃ្លាំងគ្រាប់ពូជពន្ធុវិទ្យារួមមួយ។",
      "content": "បេសកជនមកពីប្រទេសកសិកម្មចំនួន ៥៦ បានជួបប្រជុំគ្នានៅទីក្រុងហ្សឺណែវ ដើម្បីបង្កើតឃ្លាំងគ្រាប់ពូជពន្ធុវិទ្យារួមមួយ។<br><br>សន្ធិសញ្ញានេះហាមប្រាមការស្តុកទុកគ្រាប់ធញ្ញជាតិដើម្បីកេងចំណេញ និងផ្តល់គ្រាប់ពូជដែលធន់នឹងគ្រោះរាំងស្ងួតដោយឥតគិតថ្លៃដល់សហករណ៍កសិកម្មនៅទូទាំងពិភពលោក។ គណៈប្រតិភូបានសាទរចំពោះសន្ធិសញ្ញានេះថាជាជ័យជម្នះជាប្រវត្តិសាស្ត្រក្នុងការទប់ស្កាត់គ្រោះទុរភិក្ស។"
    }
  },
  {
    "id": "world-4",
    "category": "world",
    "author": "SOPHEAP CHANTHOU",
    "date": "JULY 08, 2026",
    "dateKm": "០៨ កក្កដា ២០២៦",
    "wordCount": "1,300 WORDS",
    "wordCountKm": "១,៣០០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/silicon_telegraph.png",
    "en": {
      "title": "MEKONG RIVER BASIN RENEWABLE ALLIANCE",
      "subtitle": "Riparian states launch cooperative seasonal flow protocols and micro-hydro networks.",
      "preview": "A landmark multi-lateral summit in Phnom Penh concluded with the ratification of the Mekong Sustainable Basin Agreement.",
      "content": "A landmark multi-lateral summit in Phnom Penh concluded with the ratification of the Mekong Sustainable Basin Agreement.<br><br>The collaborative initiative deploys low-impact micro-turbines along natural tributaries while protecting vital fish migration corridors and agricultural wetlands throughout Cambodia, Laos, Thailand, and Vietnam."
    },
    "km": {
      "title": "សម្ព័ន្ធថាមពលកកើតឡើងវិញនៃអាងទន្លេមេគង្គ",
      "subtitle": "ប្រទេសជាប់ដងទន្លេដាក់ចេញពិធីសារគ្រប់គ្រងលំហូរទឹកតាមរដូវកាល និងបណ្តាញវារីអគ្គិសនីខ្នាតតូច។",
      "preview": "កិច្ចប្រជុំកំពូលពហុភាគីជាប្រវត្តិសាស្ត្រនៅរាជធានីភ្នំពេញ បានបញ្ចប់ដោយការផ្តល់សច្ចាប័នលើកិច្ចព្រមព្រៀងអាងទន្លេមេគង្គប្រកបដោយនិរន្តរភាព។",
      "content": "កិច្ចប្រជុំកំពូលពហុភាគីជាប្រវត្តិសាស្ត្រនៅរាជធានីភ្នំពេញ បានបញ្ចប់ដោយការផ្តល់សច្ចាប័នលើកិច្ចព្រមព្រៀងអាងទន្លេមេគង្គប្រកបដោយនិរន្តរភាព។<br><br>គំនិតផ្តួចផ្តើមរួមគ្នានេះបានដំឡើងទួរប៊ីនខ្នាតតូចដែលមិនប៉ះពាល់ដល់បរិស្ថានតាមដៃទន្លេធម្មជាតិ ព្រមទាំងការពារផ្លូវធ្វើចរាចរណ៍របស់ត្រី និងដីសើមសម្រាប់កសិកម្មនៅកម្ពុជា ឡាវ ថៃ និងវៀតណាម។"
    }
  },
  {
    "id": "world-5",
    "category": "world",
    "author": "BEATRICE DUMONT",
    "date": "JULY 07, 2026",
    "dateKm": "០៧ កក្កដា ២០២៦",
    "wordCount": "1,150 WORDS",
    "wordCountKm": "១,១៥០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/world_map_vintage.png",
    "en": {
      "title": "THE MEDITERRANEAN SOLAR GRID SYNCHRONIZATION",
      "subtitle": "Southern European and North African energy grids achieve full synchronous power exchange.",
      "preview": "High-voltage direct current submarine conduits under the Strait of Gibraltar and the Sicilian Channel were energized yesterday.",
      "content": "High-voltage direct current submarine conduits under the Strait of Gibraltar and the Sicilian Channel were energized yesterday.<br><br>The unified grid transmits vast solar energy captured in the Sahara Desert directly into European manufacturing hubs, balancing demand fluctuations with clean thermodynamic current."
    },
    "km": {
      "title": "ការធ្វើសមកាលកម្មបណ្តាញថាមពលពន្លឺព្រះអាទិត្យមេឌីទែរ៉ាណេ",
      "subtitle": "បណ្តាញថាមពលអឺរ៉ុបខាងត្បូង និងអាហ្វ្រិកខាងជើង សម្រេចបាននូវការផ្លាស់ប្តូរថាមពលពេញលេញ។",
      "preview": "ខ្សែបញ្ជូនថាមពលក្រោមបាតសមុទ្រតង់ស្យុងខ្ពស់នៅក្រោមច្រកសមុទ្រហ្ស៊ីប្រាល់តា និងច្រកសមុទ្រស៊ីស៊ីលី ត្រូវបានបើកដំណើរការកាលពីម្សិលមិញ។",
      "content": "ខ្សែបញ្ជូនថាមពលក្រោមបាតសមុទ្រតង់ស្យុងខ្ពស់នៅក្រោមច្រកសមុទ្រហ្ស៊ីប្រាល់តា និងច្រកសមុទ្រស៊ីស៊ីលី ត្រូវបានបើកដំណើរការកាលពីម្សិលមិញ។<br><br>បណ្តាញរួមគ្នានេះបញ្ជូនថាមពលពន្លឺព្រះអាទិត្យដ៏ច្រើនដែលប្រមូលបានពីវាលខ្សាច់សាហារ៉ាដោយផ្ទាល់ទៅកាន់តំបន់ផលិតកម្មនៅអឺរ៉ុប ដោយជួយរក្សាលំនឹងតម្រូវការជាមួយនឹងចរន្តអគ្គិសនីស្អាត។"
    }
  },
  {
    "id": "world-6",
    "category": "world",
    "author": "HAROLD FINCH",
    "date": "JULY 06, 2026",
    "dateKm": "០៦ កក្កដា ២០២៦",
    "wordCount": "1,050 WORDS",
    "wordCountKm": "១,០៥០ ពាក្យ",
    "readTime": "4 MIN READ",
    "readTimeKm": "៤ នាទីអាន",
    "image": "assets/images/printing_press.png",
    "en": {
      "title": "INTERNATIONAL POSTAL UNION RESTORES ANALOG MAIL PRIVACY",
      "subtitle": "Global standard declares physical sealed parchment correspondence inviolable.",
      "preview": "Delegates meeting in Bern have unanimously reaffirmed the absolute confidentiality of physical letter mail.",
      "content": "Delegates meeting in Bern have unanimously reaffirmed the absolute confidentiality of physical letter mail.<br><br>The treaty re-establishes severe international sanctions against unauthorized optical scanning or interception of physical post, leading to a worldwide surge in diplomatic wax seals and embossed envelope manufacturing."
    },
    "km": {
      "title": "សហភាពប្រៃសណីយ៍អន្តរជាតិស្តារឯកជនភាពសំបុត្រក្រដាសឡើងវិញ",
      "subtitle": "ស្តង់ដារសកលប្រកាសថាការឆ្លើយឆ្លងតាមសំបុត្រក្រដាសបិទជិតមិនអាចរំលោភបំពានបានឡើយ។",
      "preview": "គណៈប្រតិភូដែលជួបប្រជុំគ្នានៅទីក្រុងប៊ែនបានបញ្ជាក់ជាឯកច្ឆ័ន្ទឡើងវិញនូវការសម្ងាត់ដាច់ខាតនៃសំបុត្រក្រដាស។",
      "content": "គណៈប្រតិភូដែលជួបប្រជុំគ្នានៅទីក្រុងប៊ែនបានបញ្ជាក់ជាឯកច្ឆ័ន្ទឡើងវិញនូវការសម្ងាត់ដាច់ខាតនៃសំបុត្រក្រដាស។<br><br>សន្ធិសញ្ញានេះបង្កើតការដាក់ទណ្ឌកម្មអន្តរជាតិយ៉ាងធ្ងន់ធ្ងរប្រឆាំងនឹងការស្កែនអុបទិក ឬការលួចស្ទាក់ចាប់សំបុត្រដោយគ្មានការអនុញ្ញាត ដែលជំរុញឱ្យមានការពេញនិយមប្រើប្រាស់ត្រាក្រមួននិងស្រោមសំបុត្រប្រណិតទូទាំងពិភពលោក។"
    }
  },
  {
    "id": "world-7",
    "category": "world",
    "author": "AMINA KABORE",
    "date": "JULY 05, 2026",
    "dateKm": "០៥ កក្កដា ២០២៦",
    "wordCount": "1,200 WORDS",
    "wordCountKm": "១,២០០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/world_map_vintage.png",
    "en": {
      "title": "THE GREAT GREEN WALL OF AFRICA EXPANDS NINETEEN PERCENT",
      "subtitle": "Community agro-forestry cooperatives halt desertification across eleven nations.",
      "preview": "Satellite survey maps released by the African Union confirm that indigenous acacia and baobab plantations have successfully stabilized 50,000 square kilometers of Sahel soil.",
      "content": "Satellite survey maps released by the African Union confirm that indigenous acacia and baobab plantations have successfully stabilized 50,000 square kilometers of Sahel soil.<br><br>Local agricultural yields have doubled in participating villages, demonstrating that grassroots ecology and localized water harvesting methods outperform heavy industrial mechanization."
    },
    "km": {
      "title": "ជញ្ជាំងបៃតងដ៏អស្ចារ្យនៃទ្វីបអាហ្វ្រិកពង្រីកបាន ១៩ ភាគរយ",
      "subtitle": "សហករណ៍កសិ-រុក្ខាប្រមាញ់សហគមន៍បានបញ្ឈប់ការពង្រីកវាលខ្សាច់នៅទូទាំង ១១ ប្រទេស។",
      "preview": "ផែនទីស្ទង់មតិផ្កាយរណបដែលចេញផ្សាយដោយសហភាពអាហ្វ្រិកបានបញ្ជាក់ថា ចម្ការដើមអាកាសៀនិងបាអូបាប់បានជួយទប់លំនឹងដីខ្សាច់ទំហំ ៥០,០០០ គីឡូម៉ែត្រក្រឡា។",
      "content": "ផែនទីស្ទង់មតិផ្កាយរណបដែលចេញផ្សាយដោយសហភាពអាហ្វ្រិកបានបញ្ជាក់ថា ចម្ការដើមអាកាសៀនិងបាអូបាប់បានជួយទប់លំនឹងដីខ្សាច់ទំហំ ៥០,០០០ គីឡូម៉ែត្រក្រឡា។<br><br>ទិន្នផលកសិកម្មក្នុងស្រុកបានកើនឡើងទ្វេដងនៅក្នុងភូមិដែលចូលរួម ដោយបង្ហាញថាការអភិរក្សអេកូឡូស៊ីមូលដ្ឋាននិងការប្រមូលទឹកភ្លៀងផ្តល់ផលប្រសើរជាងគ្រឿងចក្រឧស្សាហកម្មធុនធ្ងន់។"
    }
  },
  {
    "id": "world-8",
    "category": "world",
    "author": "GUSTAV LINDQVIST",
    "date": "JULY 04, 2026",
    "dateKm": "០៤ កក្កដា ២០២៦",
    "wordCount": "1,000 WORDS",
    "wordCountKm": "១,០០០ ពាក្យ",
    "readTime": "4 MIN READ",
    "readTimeKm": "៤ នាទីអាន",
    "image": "assets/images/silicon_telegraph.png",
    "en": {
      "title": "NORDIC BALTIC SUBSEA TELEGRAPH FIBRE UPGRADE",
      "subtitle": "Ultra-resilient unrepeatered oceanic cables link Stockholm, Helsinki, and Tallinn.",
      "preview": "Engineers have successfully submerged high-purity silica optical waveguides across the Baltic seafloor.",
      "content": "Engineers have successfully submerged high-purity silica optical waveguides across the Baltic seafloor.<br><br>Operating with zero active electrical repeaters, the passive infrastructure is completely immune to electromagnetic interference, guaranteeing sovereign cryptographic communications between Baltic states."
    },
    "km": {
      "title": "ការធ្វើឱ្យប្រសើរឡើងនូវខ្សែកាបក្រោមបាតសមុទ្រន័រឌីក-បាល់ទិក",
      "subtitle": "ខ្សែកាបអុបទិកក្រោមបាតសមុទ្រដែលមានភាពធន់ខ្ពស់តភ្ជាប់រវាងស្តុកខុល ហែលស៊ិនគី និងតាលីន។",
      "preview": "វិស្វករបានបញ្ចប់ការដាក់ពង្រាយបណ្តាញខ្សែកាបអុបទិកកម្រិតខ្ពស់ឆ្លងកាត់បាតសមុទ្របាល់ទិកដោយជោគជ័យ។",
      "content": "វិស្វករបានបញ្ចប់ការដាក់ពង្រាយបណ្តាញខ្សែកាបអុបទិកកម្រិតខ្ពស់ឆ្លងកាត់បាតសមុទ្របាល់ទិកដោយជោគជ័យ។<br><br>ដោយមិនចាំបាច់ប្រើប្រាស់ឧបករណ៍ពង្រីកសញ្ញាអគ្គិសនី ហេដ្ឋារចនាសម្ព័ន្ធនេះមិនទទួលរងការរំខានពីដែនអេឡិចត្រូម៉ាញ៉េទិចឡើយ ដោយធានានូវទំនាក់ទំនងសម្ងាត់រវាងរដ្ឋបាល់ទិក។"
    }
  },
  {
    "id": "world-9",
    "category": "world",
    "author": "LEONARDO FERREIRA",
    "date": "JULY 03, 2026",
    "dateKm": "០៣ កក្កដា ២០២៦",
    "wordCount": "1,150 WORDS",
    "wordCountKm": "១,១៥០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/world_map_vintage.png",
    "en": {
      "title": "AMAZON BIODIVERSITY CORRIDOR RATIFIED",
      "subtitle": "Nine South American nations sign permanent legal conservation sanctuary across basin.",
      "preview": "In Manaus, environmental ministers signed the historic Pan-Amazonian Biological Sanctuary Treaty.",
      "content": "In Manaus, environmental ministers signed the historic Pan-Amazonian Biological Sanctuary Treaty.<br><br>The treaty grants indigenous communities sovereign custodial authority over eight million square kilometers of rainforest, legally recognizing ancient land stewardship as national conservation territory."
    },
    "km": {
      "title": "ច្រករបៀងជីវចម្រុះអាម៉ាហ្សូនត្រូវបានផ្តល់សច្ចាប័ន",
      "subtitle": "ប្រទេសអាមេរិកខាងត្បូងចំនួនប្រាំបួនបានចុះហត្ថលេខាលើដែនជម្រកអភិរក្សស្របច្បាប់ជាអចិន្ត្រៃយ៍។",
      "preview": "នៅទីក្រុងម៉ាណូស រដ្ឋមន្ត្រីបរិស្ថានបានចុះហត្ថលេខាលើសន្ធិសញ្ញាដែនជម្រកជីវសាស្ត្រអាម៉ាហ្សូនជាប្រវត្តិសាស្ត្រ។",
      "content": "នៅទីក្រុងម៉ាណូស រដ្ឋមន្ត្រីបរិស្ថានបានចុះហត្ថលេខាលើសន្ធិសញ្ញាដែនជម្រកជីវសាស្ត្រអាម៉ាហ្សូនជាប្រវត្តិសាស្ត្រ។<br><br>សន្ធិសញ្ញានេះផ្តល់សិទ្ធិអំណាចពេញលេញដល់សហគមន៍ជនជាតិដើមភាគតិចក្នុងការគ្រប់គ្រងព្រៃទឹកភ្លៀងទំហំ ៨ លានគីឡូម៉ែត្រក្រឡា ដោយទទួលស្គាល់ការការពារដីធ្លីពីបុរាណជាដែនអភិរក្សជាតិ។"
    }
  },
  {
    "id": "world-10",
    "category": "world",
    "author": "CATHERINE PEMBROKE",
    "date": "JULY 02, 2026",
    "dateKm": "០២ កក្កដា ២០២៦",
    "wordCount": "1,350 WORDS",
    "wordCountKm": "១,៣៥០ ពាក្យ",
    "readTime": "6 MIN READ",
    "readTimeKm": "៦ នាទីអាន",
    "image": "assets/images/zeppelin_routes.png",
    "en": {
      "title": "THE REVIVAL OF TRANS-ATLANTIC DIPLOMATIC PACKETS",
      "subtitle": "Sovereign courier airships re-establish tamper-evident diplomatic postal lines.",
      "preview": "The historic airship 'St. George' arrived in New York harbour this morning, carrying ceremonial treaties between London, Paris, and Washington.",
      "content": "The historic airship 'St. George' arrived in New York harbour this morning, carrying ceremonial treaties between London, Paris, and Washington.<br><br>Governments are increasingly turning to dedicated physical diplomatic couriers aboard scheduled rigid airships to transfer sensitive intergovernmental instruments beyond the reach of digital surveillance."
    },
    "km": {
      "title": "ការរស់ឡើងវិញនៃកញ្ចប់ការទូតឆ្លងកាត់មហាសមុទ្រអាត្លង់ទិក",
      "subtitle": "នាវាអាកាសការទូតបានបង្កើតបណ្តាញប្រៃសណីយ៍ការទូតដែលមិនអាចលួចបន្លំបានឡើងវិញ។",
      "preview": "នាវាអាកាសជាប្រវត្តិសាស្ត្រ 'St. George' បានមកដល់កំពង់ផែញូវយ៉កនៅព្រឹកនេះ ដោយបាននាំយកសន្ធិសញ្ញាផ្លូវការរវាងទីក្រុងឡុងដ៍ ប៉ារីស និងវ៉ាស៊ីនតោន។",
      "content": "នាវាអាកាសជាប្រវត្តិសាស្ត្រ 'St. George' បានមកដល់កំពង់ផែញូវយ៉កនៅព្រឹកនេះ ដោយបាននាំយកសន្ធិសញ្ញាផ្លូវការរវាងទីក្រុងឡុងដ៍ ប៉ារីស និងវ៉ាស៊ីនតោន។<br><br>រដ្ឋាភិបាលនានាកំពុងងាកមកប្រើប្រាស់អ្នកនាំសារការទូតជាក់ស្តែងនៅលើនាវាអាកាស ដើម្បីផ្ទេរឯកសារសម្ងាត់រវាងរដ្ឋាភិបាល ដោយចៀសផុតពីការលួចស្ទាក់ចាប់តាមប្រព័ន្ធឌីជីថល។"
    }
  },
  {
    "id": "tech-1",
    "category": "technology",
    "author": "ALEXIS VANCE",
    "date": "JULY 11, 2026",
    "dateKm": "១១ កក្កដា ២០២៦",
    "wordCount": "1,200 WORDS",
    "wordCountKm": "១,២០០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/silicon_telegraph.png",
    "en": {
      "title": "THE SILICON TELEGRAPH: ANALOG SIGNALS IN A DIGITAL SEA",
      "subtitle": "How localized copper and mechanical relays are outlasting brittle satellite networks.",
      "preview": "In an era obsessed with volatile cloud arrays and algorithmic whispers, a quiet counter-revolution gathers steam across the telegraphic corridors of Zurich and London.",
      "content": "In an era obsessed with volatile cloud arrays and algorithmic whispers, a quiet counter-revolution gathers steam across the telegraphic corridors of Zurich and London.<br><br>Engineers at the Imperial Institute have unveiled the Solid-State Relay Matrix — a cryptographic mechanical relay that encrypts byte streams using physical brass tuning forks vibrating at acoustic harmonic frequencies.<br><br>The result is a communication channel impervious to quantum decryptors, providing banks and sovereign news services with absolute cryptographic finality."
    },
    "km": {
      "title": "ទូរលេខស៊ីលីខន៖ សញ្ញាអាណាឡូកនៅក្នុងសមុទ្រឌីជីថល",
      "subtitle": "របៀបដែលខ្សែទង់ដែងក្នុងស្រុក និងប្រព័ន្ធបញ្ជូនសញ្ញាមេកានិចកំពុងជំនួសបណ្តាញផ្កាយរណបដែលងាយរងគ្រោះ។",
      "preview": "នៅក្នុងយុគសម័យនៃការផ្ទុកទិន្នន័យលើពពក និងក្បួនដោះស្រាយដ៏ស្មុគស្មាញ បដិវត្តន៍ស្ងប់ស្ងាត់មួយកំពុងកើតឡើងនៅតាមបណ្តាញទូរលេខនៃទីក្រុងហ្សូរិក និងឡុងដ៍។",
      "content": "នៅក្នុងយុគសម័យនៃការផ្ទុកទិន្នន័យលើពពក និងក្បួនដោះស្រាយដ៏ស្មុគស្មាញ បដិវត្តន៍ស្ងប់ស្ងាត់មួយកំពុងកើតឡើងនៅតាមបណ្តាញទូរលេខនៃទីក្រុងហ្សូរិក និងឡុងដ៍។<br><br>វិស្វករនៅវិទ្យាស្ថានបានដាក់បង្ហាញម៉ាទ្រីសបញ្ជូនសញ្ញាមេកានិច — ដែលជាឧបករណ៍កូដនីយកម្មទិន្នន័យដោយប្រើសមលោហធាតុលង្ហិនដែលញ័រក្នុងប្រេកង់រលកសូរសំឡេង។<br><br>លទ្ធផលគឺបណ្តាញទំនាក់ទំនងដែលមិនអាចបំបែកបានដោយកុំព្យូទ័រកង់ទិច ដែលផ្តល់ឱ្យធនាគារ និងទីភ្នាក់ងារសារព័ត៌មាននូវសុវត្ថិភាពទិន្នន័យដាច់ខាត។"
    }
  },
  {
    "id": "tech-2",
    "category": "technology",
    "author": "DR. CORNELIUS VANE",
    "date": "JULY 10, 2026",
    "dateKm": "១០ កក្កដា ២០២៦",
    "wordCount": "1,600 WORDS",
    "wordCountKm": "១,៦០០ ពាក្យ",
    "readTime": "7 MIN READ",
    "readTimeKm": "៧ នាទីអាន",
    "image": "assets/images/monospace_return.png",
    "en": {
      "title": "OFFLINE COMPUTING ARCHITECTURES OVERTAKE CLOUD MONOPOLIES",
      "subtitle": "Peer-to-peer mesh storage and local SQLite datastores surpass centralized services in retention.",
      "preview": "A comprehensive benchmark published by the Cambridge Computing Guild reveals that offline-first web applications achieve 99.999% uptime compared to fragile hyperscale cloud datacenters.",
      "content": "A comprehensive benchmark published by the Cambridge Computing Guild reveals that offline-first web applications achieve 99.999% uptime compared to fragile hyperscale cloud datacenters.<br><br>Developers are stripping out bloated client-side bundles in favor of lean, self-contained HTML architectures that sync cryptographically across mesh Bluetooth relays and local browser storage without recurring server subscriptions."
    },
    "km": {
      "title": "ស្ថាបត្យកម្មកុំព្យូទ័រក្រៅបណ្តាញវ៉ាដាច់ប្រព័ន្ធពពកផ្តាច់មុខ",
      "subtitle": "ការផ្ទុកទិន្នន័យពីមនុស្សម្នាក់ទៅមនុស្សម្នាក់ និងមូលដ្ឋានទិន្នន័យក្នុងស្រុក លើសពីសេវាកម្មកណ្តាលក្នុងការរក្សាទិន្នន័យ។",
      "preview": "ការសិក្សាគោលមួយដែលត្រូវបានចេញផ្សាយដោយសមាគមកុំព្យូទ័រខេមប្រ៊ីជ បង្ហាញថាកម្មវិធីគេហទំព័រដែលដំណើរការក្រៅបណ្តាញដំបូង សម្រេចបាននូវស្ថេរភាព ៩៩.៩៩៩% បើធៀបនឹងមជ្ឈមណ្ឌលទិន្នន័យពពក។",
      "content": "ការសិក្សាគោលមួយដែលត្រូវបានចេញផ្សាយដោយសមាគមកុំព្យូទ័រខេមប្រ៊ីជ បង្ហាញថាកម្មវិធីគេហទំព័រដែលដំណើរការក្រៅបណ្តាញដំបូង សម្រេចបាននូវស្ថេរភាព ៩៩.៩៩៩% បើធៀបនឹងមជ្ឈមណ្ឌលទិន្នន័យពពក។<br><br>អ្នកអភិវឌ្ឍន៍កំពុងកាត់បន្ថយទំហំកូដដែលមិនចាំបាច់ ដើម្បីប្តូរមកប្រើស្ថាបត្យកម្ម HTML ស្វ័យគ្រប់គ្រង ដែលធ្វើសមកាលកម្មទិន្នន័យដោយសុវត្ថិភាពតាមបណ្តាញប៊្លូធូស និងអង្គចងចាំរបស់កម្មវិធីរុករកក្នុងស្រុក។"
    }
  },
  {
    "id": "tech-3",
    "category": "technology",
    "author": "EVELYN ST. CLAIR",
    "date": "JULY 09, 2026",
    "dateKm": "០៩ កក្កដា ២០២៦",
    "wordCount": "1,350 WORDS",
    "wordCountKm": "១,៣៥០ ពាក្យ",
    "readTime": "6 MIN READ",
    "readTimeKm": "៦ នាទីអាន",
    "image": "assets/images/vintage_typewriter.png",
    "en": {
      "title": "ACOUSTIC KEYSTROKE CIPHERS IN HIGH FINANCE",
      "subtitle": "Why Wall Street trading houses are reintroducing mechanical typewriters for audit trails.",
      "preview": "The deafening clatter of cast-iron typewriters has returned to the trading floors of Lower Manhattan and the City of London.",
      "content": "The deafening clatter of cast-iron typewriters has returned to the trading floors of Lower Manhattan and the City of London.<br><br>Faced with sophisticated AI deep-fakes and invisible database alterations, institutional compliance desks now mandate that all billion-dollar ledger reconciliations be physically typed with carbon ribbon on rag paper and signed with wet ink."
    },
    "km": {
      "title": "ការប្រើប្រាស់កូដសំឡេងវាយអក្សរក្នុងវិស័យហិរញ្ញវត្ថុកម្រិតខ្ពស់",
      "subtitle": "មូលហេតុដែលក្រុមហ៊ុនជួញដូរនៅ Wall Street នាំយកអង្គុលីលេខមេកានិចមកប្រើប្រាស់ឡើងវិញសម្រាប់សវនកម្ម។",
      "preview": "សំឡេងវាយអង្គុលីលេខដែកថែបបានត្រឡប់មកកាន់ជាន់ជួញដូរនៃតំបន់ Manhattan និងទីក្រុងឡុងដ៍ជាថ្មីម្តងទៀត។",
      "content": "សំឡេងវាយអង្គុលីលេខដែកថែបបានត្រឡប់មកកាន់ជាន់ជួញដូរនៃតំបន់ Manhattan និងទីក្រុងឡុងដ៍ជាថ្មីម្តងទៀត។<br><br>ដោយប្រឈមមុខនឹងបច្ចេកវិទ្យាក្លែងបន្លំ AI និងការលួចកែប្រែមូលដ្ឋានទិន្នន័យ ស្ថាប័នហិរញ្ញវត្ថុធំៗឥឡូវនេះតម្រូវឱ្យរាល់របាយការណ៍គណនេយ្យរាប់ពាន់លានដុល្លារ ត្រូវវាយពុម្ពជាក់ស្តែងលើក្រដាស និងចុះហត្ថលេខាដោយទឹកខ្មៅផ្ទាល់។"
    }
  },
  {
    "id": "tech-4",
    "category": "technology",
    "author": "MAXIMILIAN STERLING",
    "date": "JULY 08, 2026",
    "dateKm": "០៨ កក្កដា ២០២៦",
    "wordCount": "1,100 WORDS",
    "wordCountKm": "១,១០០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/silicon_telegraph.png",
    "en": {
      "title": "MAGNETIC CORE MEMORIES FIND NEW LIFE IN SATELLITES",
      "subtitle": "Ferrite toroidal rings prove immune to cosmic radiation and coronal mass ejections.",
      "preview": "Aerospace engineers at the Toulouse Space Observatory have successfully revived 1960s-era hand-woven magnetic core memory for deep-space probes.",
      "content": "Aerospace engineers at the Toulouse Space Observatory have successfully revived 1960s-era hand-woven magnetic core memory for deep-space probes.<br><br>While nanometer silicon chips suffer single-event upsets during solar storms, electromagnetic ferrite toroids retain magnetic polarization for centuries without consuming electrical standby current."
    },
    "km": {
      "title": "អង្គចងចាំស្នូលម៉ាញេទិកទទួលបានជីវិតថ្មីក្នុងផ្កាយរណប",
      "subtitle": "កងម៉ាញ៉េទិកហ្វែរីតបង្ហាញពីភាពស៊ាំនឹងកាំរស្មីអវកាស និងព្យុះព្រះអាទិត្យ។",
      "preview": "វិស្វករអវកាសនៅមជ្ឈមណ្ឌល Toulouse បានកែច្នៃអង្គចងចាំម៉ាញ៉េទិកតាំងពីទសវត្សរ៍ឆ្នាំ ១៩៦០ មកប្រើប្រាស់ឡើងវិញសម្រាប់យានអវកាសជ្រៅ។",
      "content": "វិស្វករអវកាសនៅមជ្ឈមណ្ឌល Toulouse បានកែច្នៃអង្គចងចាំម៉ាញ៉េទិកតាំងពីទសវត្សរ៍ឆ្នាំ ១៩៦០ មកប្រើប្រាស់ឡើងវិញសម្រាប់យានអវកាសជ្រៅ។<br><br>ខណៈដែលបន្ទះឈីបស៊ីលីខនទំនើបងាយរងការខូចខាតពីព្យុះព្រះអាទិត្យ កងម៉ាញ៉េទិកបុរាណអាចរក្សាទិន្នន័យបានរាប់រយឆ្នាំដោយមិនចាំបាច់ប្រើប្រាស់ចរន្តអគ្គិសនីជំនួយឡើយ។"
    }
  },
  {
    "id": "tech-5",
    "category": "technology",
    "author": "DR. ASTRID LINDE",
    "date": "JULY 07, 2026",
    "dateKm": "០៧ កក្កដា ២០២៦",
    "wordCount": "1,250 WORDS",
    "wordCountKm": "១,២៥០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/printing_press.png",
    "en": {
      "title": "BIOLOGICAL DNA STORAGE PRINTS ENTIRE ENCYCLOPEDIA IN A DROPLET",
      "subtitle": "Synthetic oligonucleotide sequences preserve human literature in amber-sealed vials.",
      "preview": "Biophysicists in Uppsala have demonstrated cold-storage data density exceeding 215 petabytes per gram of synthetic DNA.",
      "content": "Biophysicists in Uppsala have demonstrated cold-storage data density exceeding 215 petabytes per gram of synthetic DNA.<br><br>The complete catalog of the Library of Alexandria and global open-source code archives have been synthesized into microscopic silica beads, designed to withstand geological shifts for over a million years."
    },
    "km": {
      "title": "ការផ្ទុកទិន្នន័យក្នុង DNA ជីវសាស្ត្រផ្ទុកសព្វវចនាធិប្បាយទាំងមូលក្នុងដំណក់ទឹកមួយ",
      "subtitle": "លំដាប់លំដោយ DNA សំយោគរក្សាទុកស្នាដៃអក្សរសាស្ត្រមនុស្សជាតិក្នុងដបកែវបិទជិត។",
      "preview": "អ្នករូបវិទ្យាជីវសាស្ត្រនៅទីក្រុងអុបសាឡា បានបង្ហាញពីដង់ស៊ីតេនៃការផ្ទុកទិន្នន័យលើសពី ២១៥ Petabytes ក្នុងមួយក្រាមនៃ DNA សំយោគ។",
      "content": "អ្នករូបវិទ្យាជីវសាស្ត្រនៅទីក្រុងអុបសាឡា បានបង្ហាញពីដង់ស៊ីតេនៃការផ្ទុកទិន្នន័យលើសពី ២១៥ Petabytes ក្នុងមួយក្រាមនៃ DNA សំយោគ។<br><br>កាតាឡុកពេញលេញនៃបណ្ណាល័យបុរាណ និងបណ្ណសារកូដសកល ត្រូវបានសំយោគទៅជាគ្រាប់ស៊ីលីកាដ៏តូច ដែលរចនាឡើងដើម្បីទប់ទល់នឹងបម្រែបម្រួលភូមិសាស្ត្របានជាងមួយលានឆ្នាំ។"
    }
  },
  {
    "id": "tech-6",
    "category": "technology",
    "author": "KENJI TAKAHASHI",
    "date": "JULY 06, 2026",
    "dateKm": "០៦ កក្កដា ២០២៦",
    "wordCount": "1,050 WORDS",
    "wordCountKm": "១,០៥០ ពាក្យ",
    "readTime": "4 MIN READ",
    "readTimeKm": "៤ នាទីអាន",
    "image": "assets/images/monospace_return.png",
    "en": {
      "title": "THE RISE OF LOCAL RUNTIME LLMS IN THE TERMINAL",
      "subtitle": "Zero-cloud lightweight quantized neural models empower independent edge devices.",
      "preview": "Software architects are turning their backs on closed cloud API gates in favor of self-hosted, 4-bit quantized neural networks running directly on workstation silicon.",
      "content": "Software architects are turning their backs on closed cloud API gates in favor of self-hosted, 4-bit quantized neural networks running directly on workstation silicon.<br><br>These local assistants provide instant code analysis, multi-lingual translation, and document summarization with zero latency and zero data leakage to corporate advertising brokers."
    },
    "km": {
      "title": "ការកើនឡើងនៃម៉ូដែល AI ក្នុងស្រុកដែលដំណើរការលើ Terminal",
      "subtitle": "ម៉ូដែលទំហំស្រាលដែលមិនពឹងផ្អែកលើពពក ផ្តល់ថាមពលដល់ឧបករណ៍ឯករាជ្យ។",
      "preview": "អ្នករចនាស្ថាបត្យកម្មសូហ្វវែរកំពុងបោះបង់សេវាកម្មពពកបិទជិត ដើម្បីងាកមកប្រើប្រាស់បណ្តាញសរសៃប្រសាទសិប្បនិម្មិតផ្ទាល់ខ្លួននៅលើកុំព្យូទ័រ។",
      "content": "អ្នករចនាស្ថាបត្យកម្មសូហ្វវែរកំពុងបោះបង់សេវាកម្មពពកបិទជិត ដើម្បីងាកមកប្រើប្រាស់បណ្តាញសរសៃប្រសាទសិប្បនិម្មិតផ្ទាល់ខ្លួននៅលើកុំព្យូទ័រ។<br><br>កម្មវិធីជំនួយការក្នុងស្រុកទាំងនេះផ្តល់នូវការវិភាគកូដ ការបកប្រែពហុភាសា និងការសង្ខេបឯកសារភ្លាមៗដោយគ្មានភាពយឺតយ៉ាវ និងគ្មានការលេចធ្លាយទិន្នន័យទៅកាន់ក្រុមហ៊ុនពាណិជ្ជកម្មឡើយ។"
    }
  },
  {
    "id": "tech-7",
    "category": "technology",
    "author": "ELEANOR WRIGHT",
    "date": "JULY 05, 2026",
    "dateKm": "០៥ កក្កដា ២០២៦",
    "wordCount": "1,400 WORDS",
    "wordCountKm": "១,៤០០ ពាក្យ",
    "readTime": "6 MIN READ",
    "readTimeKm": "៦ នាទីអាន",
    "image": "assets/images/silicon_telegraph.png",
    "en": {
      "title": "THE DECENTRALIZED MESH TELEGRAPH NETWORK",
      "subtitle": "Community radio nodes create censorship-resistant regional packet networks.",
      "preview": "Amateur packet radio operators across Central Europe and South East Asia have joined forces to create an autonomous packet switching network.",
      "content": "Amateur packet radio operators across Central Europe and South East Asia have joined forces to create an autonomous packet switching network.<br><br>Using low-power shortwave transceivers and solar batteries, the network delivers news bulletins, weather warnings, and encrypted letters across thousands of kilometers independent of the commercial internet."
    },
    "km": {
      "title": "បណ្តាញទូរលេខវិទ្យុវិមជ្ឈការសហគមន៍",
      "subtitle": "ថ្នាំងវិទ្យុសហគមន៍បង្កើតបណ្តាញបញ្ជូនទិន្នន័យក្នុងតំបន់ដែលមិនអាចបិទខ្ទប់បាន។",
      "preview": "ប្រតិបត្តិករវិទ្យុស្ម័គ្រចិត្តនៅអឺរ៉ុបកណ្តាល និងអាស៊ីអាគ្នេយ៍ បានសហការគ្នាបង្កើតបណ្តាញបញ្ជូនកញ្ចប់ទិន្នន័យស្វយ័តមួយ។",
      "content": "ប្រតិបត្តិករវិទ្យុស្ម័គ្រចិត្តនៅអឺរ៉ុបកណ្តាល និងអាស៊ីអាគ្នេយ៍ បានសហការគ្នាបង្កើតបណ្តាញបញ្ជូនកញ្ចប់ទិន្នន័យស្វយ័តមួយ។<br><br>ដោយប្រើប្រាស់ឧបករណ៍បញ្ជូនរលកខ្លីថាមពលទាប និងអាគុយពន្លឺព្រះអាទិត្យ បណ្តាញនេះផ្តល់នូវព្រឹត្តិបត្រព័ត៌មាន ការព្រមានអាកាសធាតុ និងសំបុត្រសម្ងាត់ឆ្លងកាត់រាប់ពាន់គីឡូម៉ែត្រដោយមិនពឹងផ្អែកលើអ៊ីនធឺណិតពាណិជ្ជកម្មឡើយ។"
    }
  },
  {
    "id": "tech-8",
    "category": "technology",
    "author": "VICTORIA STERLING",
    "date": "JULY 04, 2026",
    "dateKm": "០៤ កក្កដា ២០២៦",
    "wordCount": "1,150 WORDS",
    "wordCountKm": "១,១៥០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/vintage_typewriter.png",
    "en": {
      "title": "OPTICAL DIAL SWITCHING: THE POST-SILICON INTERNET",
      "subtitle": "Photonic switches route terabits of data purely with laser reflections and prisms.",
      "preview": "Researchers at the Max Planck Institute have unveiled an optical router that eliminates electronic packet conversion entirely.",
      "content": "Researchers at the Max Planck Institute have unveiled an optical router that eliminates electronic packet conversion entirely.<br><br>By steering photons with micro-electro-mechanical mirrors, the router consumes less power than a lightbulb while switching entire petabit streams without generating waste heat."
    },
    "km": {
      "title": "ការប្តូរទិន្នន័យតាមអុបទិក៖ អ៊ីនធឺណិតក្រោយយុគសម័យស៊ីលីខន",
      "subtitle": "ឧបករណ៍ប្តូរសញ្ញាអុបទិកបញ្ជូនទិន្នន័យកម្រិត Terabit ដោយប្រើតែពន្លឺឡាស៊ែរនិងព្រីស។",
      "preview": "អ្នកស្រាវជ្រាវនៅវិទ្យាស្ថាន Max Planck បានដាក់បង្ហាញរ៉ោតទ័រអុបទិកដែលលុបបំបាត់ការបំប្លែងទិន្នន័យអេឡិចត្រូនិចទាំងស្រុង។",
      "content": "អ្នកស្រាវជ្រាវនៅវិទ្យាស្ថាន Max Planck បានដាក់បង្ហាញរ៉ោតទ័រអុបទិកដែលលុបបំបាត់ការបំប្លែងទិន្នន័យអេឡិចត្រូនិចទាំងស្រុង។<br><br>ដោយការបញ្ជាទិសដៅពន្លឺតាមរយៈកញ្ចក់អេឡិចត្រូមេកានិកខ្នាតតូច រ៉ោតទ័រនេះប្រើប្រាស់ថាមពលតិចជាងអំពូលភ្លើងមួយទៅទៀត ក្នុងការបញ្ជូនទិន្នន័យយ៉ាងច្រើនលើសលប់ដោយមិនបង្កើតកម្តៅឡើយ។"
    }
  },
  {
    "id": "tech-9",
    "category": "technology",
    "author": "CHANRAKSMEY SENG",
    "date": "JULY 03, 2026",
    "dateKm": "០៣ កក្កដា ២០២៦",
    "wordCount": "1,200 WORDS",
    "wordCountKm": "១,២០០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/silicon_telegraph.png",
    "en": {
      "title": "NATURAL LANGUAGE TYPEWRITERS WITH EMBEDDED MEMORY",
      "subtitle": "Standalone distraction-free word processors achieve cult popularity among authors.",
      "preview": "A new wave of battery-powered mechanical keyboards with built-in electronic ink displays is revolutionizing literary productivity.",
      "content": "A new wave of battery-powered mechanical keyboards with built-in electronic ink displays is revolutionizing literary productivity.<br><br>With no web browser, no notifications, and battery life measured in months, writers are producing novels at unprecedented speeds while retaining physical tactile joy."
    },
    "km": {
      "title": "អង្គុលីលេខភាសាធម្មជាតិជាមួយអង្គចងចាំបង្កប់",
      "subtitle": "ម៉ាស៊ីនវាយអត្ថបទឯករាជ្យដែលគ្មានការរំខាន ទទួលបានការពេញនិយមយ៉ាងខ្លាំងក្នុងចំណោមអ្នកនិពន្ធ។",
      "preview": "ក្តារចុចមេកានិចប្រើថ្មជាមួយអេក្រង់ទឹកខ្មៅអេឡិចត្រូនិច (E-Ink) កំពុងធ្វើបដិវត្តន៍ផលិតភាពនៃការតែងនិពន្ធ។",
      "content": "ក្តារចុចមេកានិចប្រើថ្មជាមួយអេក្រង់ទឹកខ្មៅអេឡិចត្រូនិច (E-Ink) កំពុងធ្វើបដិវត្តន៍ផលិតភាពនៃការតែងនិពន្ធ។<br><br>ដោយគ្មានកម្មវិធីរុករកអ៊ីនធឺណិត គ្មានការជូនដំណឹងរំខាន និងថ្មប្រើបានរាប់ខែ អ្នកនិពន្ធអាចបង្កើតស្នាដៃប្រលោមលោកបានយ៉ាងលឿន និងប្រកបដោយផាសុកភាពក្នុងការវាយអក្សរ។"
    }
  },
  {
    "id": "tech-10",
    "category": "technology",
    "author": "BARON VON KAUFMAN",
    "date": "JULY 02, 2026",
    "dateKm": "០២ កក្កដា ២០២៦",
    "wordCount": "1,500 WORDS",
    "wordCountKm": "១,៥០០ ពាក្យ",
    "readTime": "6 MIN READ",
    "readTimeKm": "៦ នាទីអាន",
    "image": "assets/images/printing_press.png",
    "en": {
      "title": "THE MATHEMATICAL BEAUTY OF PURE MONOSPACE CODE",
      "subtitle": "Why fixed-width typography remains the pinnacle of cognitive software clarity.",
      "preview": "Leading computer scientists argue that proportional fonts in programming environments degrade code comprehension and visual symmetry.",
      "content": "Leading computer scientists argue that proportional fonts in programming environments degrade code comprehension and visual symmetry.<br><br>Monospace grids establish strict structural predictability, aligning ASCII art, data tables, and syntax hierarchies into harmonious architectural columns that soothe the analytical eye."
    },
    "km": {
      "title": "សោភ័ណភាពគណិតវិទ្យានៃកូដអក្សរទំហំស្មើ (Monospace)",
      "subtitle": "មូលហេតុដែលពុម្ពអក្សរទំហំថេរនៅតែជាស្តង់ដារកំពូលនៃភាពច្បាស់លាស់ក្នុងការសរសេរសូហ្វវែរ។",
      "preview": "អ្នកវិទ្យាសាស្ត្រកុំព្យូទ័រឈានមុខគេលើកឡើងថា ពុម្ពអក្សរទំហំមិនស្មើគ្នាក្នុងការសរសេរកូដ ធ្វើឱ្យប៉ះពាល់ដល់ការយល់ដឹង និងតុល្យភាពមើលឃើញ។",
      "content": "អ្នកវិទ្យាសាស្ត្រកុំព្យូទ័រឈានមុខគេលើកឡើងថា ពុម្ពអក្សរទំហំមិនស្មើគ្នាក្នុងការសរសេរកូដ ធ្វើឱ្យប៉ះពាល់ដល់ការយល់ដឹង និងតុល្យភាពមើលឃើញ។<br><br>ទម្រង់អក្សរទំហំស្មើបង្កើតនូវរចនាសម្ព័ន្ធដែលអាចទស្សន៍ទាយបានយ៉ាងច្បាស់ ដោយតម្រឹមតារាងទិន្នន័យ និងលំដាប់កូដឱ្យមានសណ្តាប់ធ្នាប់ល្អប្រណិត។"
    }
  },
  {
    "id": "cult-1",
    "category": "culture",
    "author": "MARCUS CHEN",
    "date": "JULY 11, 2026",
    "dateKm": "១១ កក្កដា ២០២៦",
    "wordCount": "1,150 WORDS",
    "wordCountKm": "១,១៥០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/vintage_stationery.png",
    "en": {
      "title": "THE RENAISSANCE OF BLACK & WHITE PRINT CULTURE",
      "subtitle": "How tactile ink and letterpress publications captured the imagination of modern readers.",
      "preview": "In an age saturated by glowing liquid-crystal screens and hyper-saturated notifications, readers across the globe are turning their gaze toward the dignified poise of black ink on ivory paper.",
      "content": "In an age saturated by glowing liquid-crystal screens and hyper-saturated notifications, readers across the globe are turning their gaze toward the dignified poise of black ink on ivory paper.<br><br>Bookshops and independent gazettes in Paris, Kyoto, and London report waiting lists for limited letterpress editions printed on antique Gutenberg presses."
    },
    "km": {
      "title": "ការរស់ឡើងវិញនៃវប្បធម៌បោះពុម្ពសខ្មៅ",
      "subtitle": "របៀបដែលទឹកខ្មៅ និងការបោះពុម្ពពុម្ពអក្សរដែកបានទាក់ទាញចិត្តអ្នកអានសម័យទំនើប។",
      "preview": "នៅក្នុងយុគសម័យដែលពោរពេញទៅដោយអេក្រង់ភ្លឺចិញ្ចាច និងការជូនដំណឹងរំខាន អ្នកអានទូទាំងពិភពលោកកំពុងងាកមករកភាពថ្លៃថ្នូរនៃទឹកខ្មៅខ្មៅលើក្រដាសពណ៌កប្បាស។",
      "content": "នៅក្នុងយុគសម័យដែលពោរពេញទៅដោយអេក្រង់ភ្លឺចិញ្ចាច និងការជូនដំណឹងរំខាន អ្នកអានទូទាំងពិភពលោកកំពុងងាកមករកភាពថ្លៃថ្នូរនៃទឹកខ្មៅខ្មៅលើក្រដាសពណ៌កប្បាស។<br><br>បណ្ណាគារ និងទស្សនាវដ្តីឯករាជ្យនៅប៉ារីស ក្យូតូ និងឡុងដ៍ បានរាយការណ៍ពីការកក់ទុកសៀវភៅបោះពុម្ពពុម្ពដែកបុរាណយ៉ាងច្រើនលើសលប់។"
    }
  },
  {
    "id": "cult-2",
    "category": "culture",
    "author": "BOPHA RITHY",
    "date": "JULY 10, 2026",
    "dateKm": "១០ កក្កដា ២០២៦",
    "wordCount": "1,300 WORDS",
    "wordCountKm": "១,៣០០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/printing_press.png",
    "en": {
      "title": "PRESERVING THE ANCIENT KHMER PALM-LEAF MANUSCRIPTS",
      "subtitle": "Master scribes and archivists digitize thousands of sacred Trai Phum scrolls in Siem Reap.",
      "preview": "Under the shade of ancient banyan trees near Angkor Wat, a dedicated guild of calligraphers is using iron styluses to preserve centuries-old Pali and Khmer literature.",
      "content": "Under the shade of ancient banyan trees near Angkor Wat, a dedicated guild of calligraphers is using iron styluses to preserve centuries-old Pali and Khmer literature.<br><br>By combining traditional natural resin smoking techniques with non-invasive laser photogrammetry, the team ensures these precious cultural records survive for another millennium."
    },
    "km": {
      "title": "ការអភិរក្សសាត្រាស្លឹករឹតបុរាណខ្មែរ",
      "subtitle": "សាស្ត្រាចារ្យនិងបណ្ណសារវិទូធ្វើឌីជីថលូបនីយកម្មសាត្រាគម្ពីរពិសិដ្ឋរាប់ពាន់នៅសៀមរាប។",
      "preview": "នៅក្រោមម្លប់ដើមជ្រៃបុរាណក្បែរប្រាសាទអង្គរវត្ត ក្រុមអ្នកចារសាត្រាជំនាញកំពុងប្រើប្រាស់ប្រដាប់ចារដែកដើម្បីអភិរក្សអក្សរសាស្ត្របាលី និងខ្មែរដែលមានអាយុកាលរាប់សតវត្ស។",
      "content": "នៅក្រោមម្លប់ដើមជ្រៃបុរាណក្បែរប្រាសាទអង្គរវត្ត ក្រុមអ្នកចារសាត្រាជំនាញកំពុងប្រើប្រាស់ប្រដាប់ចារដែកដើម្បីអភិរក្សអក្សរសាស្ត្របាលី និងខ្មែរដែលមានអាយុកាលរាប់សតវត្ស។<br><br>ដោយរួមបញ្ចូលបច្ចេកទេសការពារផ្សែងជ័រឈើបែបបុរាណ ជាមួយនឹងបច្ចេកវិទ្យាស្កែនឡាស៊ែរទំនើប ក្រុមការងារធានាថាកំណត់ត្រាវប្បធម៌ដ៏មានតម្លៃទាំងនេះនឹងស្ថិតស្ថេររាប់ពាន់ឆ្នាំទៅមុខទៀត។"
    }
  },
  {
    "id": "cult-3",
    "category": "culture",
    "author": "JULIAN MERCER",
    "date": "JULY 09, 2026",
    "dateKm": "០៩ កក្កដា ២០២៦",
    "wordCount": "1,050 WORDS",
    "wordCountKm": "១,០៥០ ពាក្យ",
    "readTime": "4 MIN READ",
    "readTimeKm": "៤ នាទីអាន",
    "image": "assets/images/vintage_stationery.png",
    "en": {
      "title": "THE ARCHIVAL ART OF HANDMADE FOUNTAIN PEN INKS",
      "subtitle": "Oak gall, iron sulphate, and gum arabic: craftsmen revive archival ink formulations.",
      "preview": "In small ateliers across Edinburgh and Florence, artisanal chemists are hand-brewing permanent archival inks that resist fading for centuries.",
      "content": "In small ateliers across Edinburgh and Florence, artisanal chemists are hand-brewing permanent archival inks that resist fading for centuries.<br><br>Using traditional crushed oak galls, natural indigo pigments, and crystalline gum arabic, these inks create a rich, velvety black stroke that binds chemically to cotton paper fibers."
    },
    "km": {
      "title": "សិល្បៈនៃការផលិតទឹកខ្មៅប៉ាកកាដោយដៃ",
      "subtitle": "ការរួមបញ្ចូលសារធាតុធម្មជាតិ៖ សិប្បកររស់ឡើងវិញនូវរូបមន្តទឹកខ្មៅបណ្ណសារបុរាណ។",
      "preview": "នៅក្នុងរោងសិប្បកម្មតូចៗនៅទីក្រុង Edinburgh និង Florence គីមីវិទូកំពុងផលិតទឹកខ្មៅគុណភាពខ្ពស់ដែលមិនរសាត់បាត់ពណ៌រាប់រយឆ្នាំ។",
      "content": "នៅក្នុងរោងសិប្បកម្មតូចៗនៅទីក្រុង Edinburgh និង Florence គីមីវិទូកំពុងផលិតទឹកខ្មៅគុណភាពខ្ពស់ដែលមិនរសាត់បាត់ពណ៌រាប់រយឆ្នាំ។<br><br>ដោយប្រើប្រាស់ផ្លែឈើធម្មជាតិ និងសារធាតុពណ៌រុក្ខជាតិ ទឹកខ្មៅទាំងនេះបង្កើតបានជាស្នាមសរសេរពណ៌ខ្មៅរលើបរលោង ដែលជ្រាបចូលទៅក្នុងសរសៃក្រដាសកប្បាសយ៉ាងរឹងមាំ។"
    }
  },
  {
    "id": "cult-4",
    "category": "culture",
    "author": "CLARA SCHUMANN",
    "date": "JULY 08, 2026",
    "dateKm": "០៨ កក្កដា ២០២៦",
    "wordCount": "1,200 WORDS",
    "wordCountKm": "១,២០០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/printing_press.png",
    "en": {
      "title": "ACOUSTIC CHAMBER MUSIC CONCERTS IN THE CANDLELIGHT",
      "subtitle": "Audiences abandon digital amplification for pure uncompressed orchestral acoustics.",
      "preview": "Concert halls in Vienna and Prague are holding fully unplugged acoustic recitals illuminated solely by beeswax candles.",
      "content": "Concert halls in Vienna and Prague are holding fully unplugged acoustic recitals illuminated solely by beeswax candles.<br><br>Without speakers, monitors, or digital equalizers, the pure wooden resonance of violins and cellos fills the hall with intimate, dynamic sonic warmth that digital streams cannot replicate."
    },
    "km": {
      "title": "ការប្រគំតន្ត្រីសភាសូរសំឡេងធម្មជាតិក្រោមពន្លឺទៀន",
      "subtitle": "ទស្សនិកជនបោះបង់ឧបករណ៍បំពងសំឡេងឌីជីថល ដើម្បីស្តាប់តន្ត្រីឧបករណ៍បុរាណសុទ្ធសាធ។",
      "preview": "សាលប្រគំតន្ត្រីនៅទីក្រុងវីយែន និងប្រាក កំពុងរៀបចំការប្រគំតន្ត្រីដោយមិនប្រើឧបករណ៍បំពងសំឡេង ក្រោមពន្លឺភ្លើងទៀនក្រមួនឃ្មុំ។",
      "content": "សាលប្រគំតន្ត្រីនៅទីក្រុងវីយែន និងប្រាក កំពុងរៀបចំការប្រគំតន្ត្រីដោយមិនប្រើឧបករណ៍បំពងសំឡេង ក្រោមពន្លឺភ្លើងទៀនក្រមួនឃ្មុំ។<br><br>ដោយគ្មានឧបករណ៍បំពងសំឡេង ឬប្រព័ន្ធឌីជីថល សំឡេងឈើធម្មជាតិនៃវីយូឡុងនិងសេឡូ បានបន្លឺឡើងយ៉ាងពិរោះរណ្តំ និងពោរពេញដោយភាពកក់ក្តៅដែលប្រព័ន្ធឌីជីថលមិនអាចប្រៀបផ្ទឹមបាន។"
    }
  },
  {
    "id": "cult-5",
    "category": "culture",
    "author": "PICH SOCHEAT",
    "date": "JULY 07, 2026",
    "dateKm": "០៧ កក្កដា ២០២៦",
    "wordCount": "1,100 WORDS",
    "wordCountKm": "១,១០០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/vintage_stationery.png",
    "en": {
      "title": "THE REVIVAL OF TRADITIONAL KHMER SHADOW THEATRE",
      "subtitle": "Sbek Thom master puppeteers captivate new generations with firelight storytelling.",
      "preview": "In the courtyard of Wat Bo in Siem Reap, the magnificent leather shadows of the Reamker epic dance once again across translucent white screens.",
      "content": "In the courtyard of Wat Bo in Siem Reap, the magnificent leather shadows of the Reamker epic dance once again across translucent white screens.<br><br>Carved from single cowhides and dyed with natural tree bark extracts, each puppet represents weeks of meticulous craftsmanship, accompanied by the hypnotic rhythms of the traditional Pinpeat orchestra."
    },
    "km": {
      "title": "ការរស់ឡើងវិញនៃល្ខោនស្រមោលស្បែកធំខ្មែរ",
      "subtitle": "សិល្បករជើងចាស់នៃល្ខោនស្បែកធំទាក់ទាញយុវជនជំនាន់ក្រោយតាមរយៈការសម្តែងលើផ្ទាំងក្រណាត់។",
      "preview": "នៅក្នុងបរិវេណវត្តបូព៌ ក្រុងសៀមរាប ស្រមោលស្បែកដ៏អស្ចារ្យនៃរឿងរាមកេរ្តិ៍ បានរាំរែកម្តងទៀតនៅលើផ្ទាំងសំពត់សស្តើង។",
      "content": "នៅក្នុងបរិវេណវត្តបូព៌ ក្រុងសៀមរាប ស្រមោលស្បែកដ៏អស្ចារ្យនៃរឿងរាមកេរ្តិ៍ បានរាំរែកម្តងទៀតនៅលើផ្ទាំងសំពត់សស្តើង។<br><br>ចម្លាក់ស្បែកគោដែលលាបពណ៌ដោយសំបកឈើធម្មជាតិ តំណាងឱ្យការយកចិត្តទុកដាក់និងភាពប៉ិនប្រសប់របស់សិល្បករ អមដោយបទភ្លេងពិណពាទ្យដ៏រណ្តំចិត្ត។"
    }
  },
  {
    "id": "cult-6",
    "category": "culture",
    "author": "HENRIETTA BLACKWOOD",
    "date": "JULY 06, 2026",
    "dateKm": "០៦ កក្កដា ២០២៦",
    "wordCount": "1,250 WORDS",
    "wordCountKm": "១,២៥០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/printing_press.png",
    "en": {
      "title": "THE LOST ART OF COPPERPLATE MAP ENGRAVING",
      "subtitle": "Cartographers return to hand-chiseled plates for enduring geographic beauty.",
      "preview": "Master engravers in London and Amsterdam are reviving hand-carved copperplate printing for maritime and celestial charts.",
      "content": "Master engravers in London and Amsterdam are reviving hand-carved copperplate printing for maritime and celestial charts.<br><br>Each line, depth of ocean bathymetry, and decorative compass rose is painstakingly scored with diamond-tipped burins, producing prints of breathtaking clarity that last centuries."
    },
    "km": {
      "title": "សិល្បៈចម្លាក់ផែនទីលើបន្ទះស្ពាន់បុរាណ",
      "subtitle": "អ្នកគូរផែនទីត្រឡប់ទៅរកការឆ្លាក់ដោយដៃដើម្បីបង្កើតភាពស្រស់ស្អាតនៃភូមិសាស្ត្រដែលស្ថិតស្ថេរយូរអង្វែង។",
      "preview": "ជាងចម្លាក់ជំនាញនៅទីក្រុងឡុងដ៍ និងអាំស្ទែដាំ កំពុងស្តារការបោះពុម្ពផែនទីពីបន្ទះស្ពាន់ដែលឆ្លាក់ដោយដៃឡើងវិញ។",
      "content": "ជាងចម្លាក់ជំនាញនៅទីក្រុងឡុងដ៍ និងអាំស្ទែដាំ កំពុងស្តារការបោះពុម្ពផែនទីពីបន្ទះស្ពាន់ដែលឆ្លាក់ដោយដៃឡើងវិញ។<br><br>រាល់ខ្សែបន្ទាត់ ជម្រៅសមុទ្រ និងរូបត្រីវិស័យ ត្រូវបានឆ្លាក់យ៉ាងផ្ចិតផ្ចង់ដោយឧបករណ៍ចុងពេជ្រ ដែលបង្កើតបានជាផ្ទាំងផែនទីដ៏ស្រស់ស្អាតនិងមានគុណភាពខ្ពស់។"
    }
  },
  {
    "id": "cult-7",
    "category": "culture",
    "author": "KOSAL PHAN",
    "date": "JULY 05, 2026",
    "dateKm": "០៥ កក្កដា ២០២៦",
    "wordCount": "1,150 WORDS",
    "wordCountKm": "១,១៥០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/vintage_stationery.png",
    "en": {
      "title": "SILK WEAVING TRADITIONS OF PHNOM SREK",
      "subtitle": "Golden silk threads woven on heritage wooden looms preserve ancient ikat motifs.",
      "preview": "In the rural heart of Takeo province, women artisans continue a two-thousand-year-old tradition of raising golden silkworms and dyeing natural mulberry threads.",
      "content": "In the rural heart of Takeo province, women artisans continue a two-thousand-year-old tradition of raising golden silkworms and dyeing natural mulberry threads.<br><br>The resulting Hol and Phamuong silk textiles feature complex geometric patterns inspired by temple carvings, celebrated worldwide as masterpieces of wearable art."
    },
    "km": {
      "title": "ប្រពៃណីតម្បាញសូត្រភ្នំស្រុក",
      "subtitle": "សរសៃសូត្រមាសត្បាញលើកីឈើបុរាណ រក្សាទុកនូវក្បាច់គោមអីកាតបុរាណ។",
      "preview": "នៅខេត្តតាកែវ ស្ត្រីសិប្បករនៅតែបន្តប្រពៃណីចិញ្ចឹមដង្កូវនាងមាស និងជ្រលក់ពណ៌សរសៃសូត្រធម្មជាតិដែលមានអាយុកាលជាងពីរពាន់ឆ្នាំ។",
      "content": "នៅខេត្តតាកែវ ស្ត្រីសិប្បករនៅតែបន្តប្រពៃណីចិញ្ចឹមដង្កូវនាងមាស និងជ្រលក់ពណ៌សរសៃសូត្រធម្មជាតិដែលមានអាយុកាលជាងពីរពាន់ឆ្នាំ។<br><br>ហូលនិងផាមួងដែលផលិតបាន មានក្បាច់រចនាដ៏ល្អប្រណិតដែលបំផុសគំនិតពីចម្លាក់ប្រាសាទបុរាណ ដែលត្រូវបានទទួលស្គាល់ទូទាំងពិភពលោកថាជាស្នាដៃសិល្បៈដ៏ពិសិដ្ឋ។"
    }
  },
  {
    "id": "cult-8",
    "category": "culture",
    "author": "SEBASTIAN GRAHAM",
    "date": "JULY 04, 2026",
    "dateKm": "០៤ កក្កដា ២០២៦",
    "wordCount": "1,050 WORDS",
    "wordCountKm": "១,០៥០ ពាក្យ",
    "readTime": "4 MIN READ",
    "readTimeKm": "៤ នាទីអាន",
    "image": "assets/images/printing_press.png",
    "en": {
      "title": "THE RETURN OF HAND-BOUND LEATHER VOLUMES",
      "subtitle": "Bookbinders report unprecedented demand for marbled endpapers and gold-leaf tooling.",
      "preview": "Master bookbinders in Oxford and Boston are working overtime to fulfill orders for hand-stitched, full-leather bindings with gilded edges.",
      "content": "Master bookbinders in Oxford and Boston are working overtime to fulfill orders for hand-stitched, full-leather bindings with gilded edges.<br><br>Collectors and scholars seek physical volumes crafted with archival calfskin and hand-marbled endpapers that endure across generations as heirloom treasures."
    },
    "km": {
      "title": "ការត្រឡប់មកវិញនៃសៀវភៅដេរភ្ជាប់ដោយស្បែក",
      "subtitle": "ជាងដេរសៀវភៅរាយការណ៍ពីតម្រូវការខ្ពស់សម្រាប់សៀវភៅដែលដេរបិទស្បែក និងបិតមាសលើគែម។",
      "preview": "ជាងដេរសៀវភៅជំនាញនៅ Oxford និង Boston កំពុងធ្វើការបន្ថែមម៉ោងដើម្បីបំពេញការបញ្ជាទិញសៀវភៅដេរដោយដៃជាមួយស្បែកប្រណិត។",
      "content": "ជាងដេរសៀវភៅជំនាញនៅ Oxford និង Boston កំពុងធ្វើការបន្ថែមម៉ោងដើម្បីបំពេញការបញ្ជាទិញសៀវភៅដេរដោយដៃជាមួយស្បែកប្រណិត។<br><br>អ្នកប្រមូលសៀវភៅ និងអ្នកប្រាជ្ញកំពុងស្វែងរកសៀវភៅដែលផលិតឡើងយ៉ាងផ្ចិតផ្ចង់ជាមួយស្បែកគុណភាពខ្ពស់ ដែលអាចរក្សាទុកបានរាប់ជំនាន់ជាកេរ្តិ៍មរតកគ្រួសារ។"
    }
  },
  {
    "id": "cult-9",
    "category": "culture",
    "author": "THIDA MEAS",
    "date": "JULY 03, 2026",
    "dateKm": "០៣ កក្កដា ២០២៦",
    "wordCount": "1,200 WORDS",
    "wordCountKm": "១,២០០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/vintage_stationery.png",
    "en": {
      "title": "ANGKORIAN POTTERY GUILDS OF KOMPONG CHHNANG",
      "subtitle": "Potters revive unglazed earthenware techniques dating back to the ninth century.",
      "preview": "Along the banks of the Tonle Sap, potters in Kampong Chhnang are shaping clay vessels using pedal kick-wheels and wood-fired kilns.",
      "content": "Along the banks of the Tonle Sap, potters in Kampong Chhnang are shaping clay vessels using pedal kick-wheels and wood-fired kilns.<br><br>The porous natural earthenware cools drinking water naturally through evaporation and preserves the authentic flavors of Khmer culinary soups."
    },
    "km": {
      "title": "សិប្បកម្មកុលាលភាជន៍សម័យអង្គរនៅកំពង់ឆ្នាំង",
      "subtitle": "ជាងកុលាលភាជន៍ស្តារឡើងវិញនូវបច្ចេកទេសផលិតក្អមឆ្នាំងដីឥដ្ឋតាំងពីសតវត្សរ៍ទី ៩។",
      "preview": "តាមដងទន្លេសាប អ្នកភូមិកំពង់ឆ្នាំងកំពុងផលិតក្អមឆ្នាំងដីឥដ្ឋដោយប្រើពុម្ពបង្វិលជើង និងឡដុតអុសបុរាណ។",
      "content": "តាមដងទន្លេសាប អ្នកភូមិកំពង់ឆ្នាំងកំពុងផលិតក្អមឆ្នាំងដីឥដ្ឋដោយប្រើពុម្ពបង្វិលជើង និងឡដុតអុសបុរាណ។<br><br>ក្អមដីឥដ្ឋធម្មជាតិជួយឱ្យទឹកផឹកត្រជាក់ស្រួលដោយធម្មជាតិតាមរយៈការហួត និងរក្សារសជាតិដើមនៃសម្លខ្មែរបានយ៉ាងឈ្ងុយឆ្ងាញ់។"
    }
  },
  {
    "id": "cult-10",
    "category": "culture",
    "author": "LILLIAN MONTGOMERY",
    "date": "JULY 02, 2026",
    "dateKm": "០២ កក្កដា ២០២៦",
    "wordCount": "1,350 WORDS",
    "wordCountKm": "១,៣៥០ ពាក្យ",
    "readTime": "6 MIN READ",
    "readTimeKm": "៦ នាទីអាន",
    "image": "assets/images/printing_press.png",
    "en": {
      "title": "THE SLOW READING SOCIETY: SILENT SALONS OF EUROPE",
      "subtitle": "Urban gatherings where patrons spend two quiet hours reading physical books without phones.",
      "preview": "In cafes and bookshops across Berlin, London, and Madrid, a silent cultural movement is reclaiming deep human attention.",
      "content": "In cafes and bookshops across Berlin, London, and Madrid, a silent cultural movement is reclaiming deep human attention.<br><br>Participants surrender digital devices at the door, sit in comfortable velvet armchairs, and immerse themselves in physical literature over cups of dark roast coffee and herbal tea."
    },
    "km": {
      "title": "សមាគមអានសៀវភៅយឺត៖ សាលអានស្ងប់ស្ងាត់នៃទ្វីបអឺរ៉ុប",
      "subtitle": "ការជួបជុំគ្នានៅទីក្រុងដែលអ្នកចូលរួមចំណាយពេលពីរម៉ោងអានសៀវភៅក្រដាសដោយមិនប្រើទូរស័ព្ទ។",
      "preview": "នៅក្នុងហាងកាហ្វេ និងបណ្ណាគារនៅប៊ែរឡាំង ឡុងដ៍ និងម៉ាឌ្រីដ ចលនាវប្បធម៌ស្ងប់ស្ងាត់មួយកំពុងទាក់ទាញការយកចិត្តទុកដាក់យ៉ាងខ្លាំង។",
      "content": "នៅក្នុងហាងកាហ្វេ និងបណ្ណាគារនៅប៊ែរឡាំង ឡុងដ៍ និងម៉ាឌ្រីដ ចលនាវប្បធម៌ស្ងប់ស្ងាត់មួយកំពុងទាក់ទាញការយកចិត្តទុកដាក់យ៉ាងខ្លាំង។<br><br>អ្នកចូលរួមផ្ញើឧបករណ៍ឌីជីថលទាំងអស់នៅមាត់ទ្វារ ហើយអង្គុយលើកៅអីយ៉ាងស្រួលដើម្បីអានសៀវភៅក្រដាស អមដោយកាហ្វេក្តៅឧណ្ហៗ និងតែរុក្ខជាតិ។"
    }
  },
  {
    "id": "op-1",
    "category": "opinion",
    "author": "LORD REGINALD STERLING",
    "date": "JULY 11, 2026",
    "dateKm": "១១ កក្កដា ២០២៦",
    "wordCount": "1,100 WORDS",
    "wordCountKm": "១,១០០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/vintage_typewriter.png",
    "en": {
      "title": "THE DECAY OF ATTENTION IN THE AGE OF THE PUSH NOTIFICATION",
      "subtitle": "Why true scholarship requires physical silence, slow ink, and uninterrupted solitude.",
      "preview": "We have traded the majestic cathedral of human thought for a chaotic bazaar of fleeting algorithmic notifications.",
      "content": "We have traded the majestic cathedral of human thought for a chaotic bazaar of fleeting algorithmic notifications.<br><br>When every second of our waking existence is fragmented into five-second video loops and synthetic alerts, the human mind loses the capacity for sustained moral reflection and scientific contemplation.<br><br>We must deliberately reclaim our intellectual borders through deliberate analog practices."
    },
    "km": {
      "title": "ការបាត់បង់ការផ្ចង់អារម្មណ៍ក្នុងយុគសម័យនៃការជូនដំណឹងទូរស័ព្ទ",
      "subtitle": "មូលហេតុដែលការសិក្សាពិតប្រាកដទាមទារភាពស្ងប់ស្ងាត់ ទឹកខ្មៅយឺត និងភាពឯកោដែលគ្មានការរំខាន។",
      "preview": "យើងបានប្តូរវិមាននៃគំនិតមនុស្សជាតិ ដើម្បីយកផ្សារដ៏ច្របូកច្របល់នៃការជូនដំណឹងតាមប្រព័ន្ធឌីជីថល។",
      "content": "យើងបានប្តូរវិមាននៃគំនិតមនុស្សជាតិ ដើម្បីយកផ្សារដ៏ច្របូកច្របល់នៃការជូនដំណឹងតាមប្រព័ន្ធឌីជីថល។<br><br>នៅពេលដែលរាល់វិនាទីនៃជីវិតរបស់យើងត្រូវបានបំបែកជាបំណែកៗដោយវីដេអូខ្លីៗ និងសាររំខាន ខួរក្បាលរបស់មនុស្សនឹងបាត់បង់សមត្ថភាពក្នុងការត្រិះរិះពិចារណាយ៉ាងស៊ីជម្រៅ។<br><br>យើងត្រូវតែស្តារឡើងវិញនូវព្រំដែនបញ្ញារបស់យើង តាមរយៈការអនុវត្តការរស់នៅបែបបុរាណដោយការតាំងចិត្ត។"
    }
  },
  {
    "id": "op-2",
    "category": "opinion",
    "author": "PROF. HELENA VANCE",
    "date": "JULY 10, 2026",
    "dateKm": "១០ កក្កដា ២០២៦",
    "wordCount": "1,250 WORDS",
    "wordCountKm": "១,២៥០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/printing_press.png",
    "en": {
      "title": "THE ETHICS OF MECHANICAL INTEGRITY IN NEWS DISPATCHES",
      "subtitle": "The irreplaceable trustworthiness of physical verification over digital speed.",
      "preview": "A newspaper printed upon paper carries a weight that a pixelated feed can never mimic.",
      "content": "A newspaper printed upon paper carries a weight that a pixelated feed can never mimic.<br><br>Because a mistake stamped in ink cannot be silently deleted with a database query, editors and journalists are compelled to exercise extreme rigor, cross-verifying facts through physical documents before committing them to the permanent historical ledger."
    },
    "km": {
      "title": "សីលធម៌នៃភាពស្មោះត្រង់ក្នុងការផ្សាយព័ត៌មានជាក់ស្តែង",
      "subtitle": "ភាពជឿជាក់ដែលមិនអាចជំនួសបាននៃការផ្ទៀងផ្ទាត់ផ្ទាល់ លើសពីល្បឿនឌីជីថល។",
      "preview": "កាសែតដែលបោះពុម្ពលើក្រដាសពិតប្រាកដ មានទម្ងន់នៃភាពជឿជាក់ដែលព័ត៌មានលើអេក្រង់មិនអាចប្រៀបបានឡើយ។",
      "content": "កាសែតដែលបោះពុម្ពលើក្រដាសពិតប្រាកដ មានទម្ងន់នៃភាពជឿជាក់ដែលព័ត៌មានលើអេក្រង់មិនអាចប្រៀបបានឡើយ។<br><br>ដោយសារតែកំហុសដែលបានបោះពុម្ពរួច មិនអាចលុបចោលដោយងាយស្រួលដូចនៅលើអ៊ីនធឺណិតឡើយ អ្នកកាសែតនិងនិពន្ធនាយកត្រូវតែមានការប្រុងប្រយ័ត្នខ្ពស់ក្នុងការផ្ទៀងផ្ទាត់ការពិត មុនពេលបោះពុម្ពទៅក្នុងប្រវត្តិសាស្ត្រ។"
    }
  },
  {
    "id": "op-3",
    "category": "opinion",
    "author": "DR. VIRAKBOT CHHAY",
    "date": "JULY 09, 2026",
    "dateKm": "០៩ កក្កដា ២០២៦",
    "wordCount": "1,000 WORDS",
    "wordCountKm": "១,០០០ ពាក្យ",
    "readTime": "4 MIN READ",
    "readTimeKm": "៤ នាទីអាន",
    "image": "assets/images/vintage_stationery.png",
    "en": {
      "title": "THE SOLACE OF HANDWRITTEN LETTERS",
      "subtitle": "Why taking pen to paper conveys empathy and permanence no text message can achieve.",
      "preview": "A handwritten letter is a physical artifact of human time and deliberate affection.",
      "content": "A handwritten letter is a physical artifact of human time and deliberate affection.<br><br>In choosing paper, filling a pen, and guiding the hand across the page, the writer gives a tangible piece of their mortal hours to the recipient, creating a lasting bond that outlives the ephemeral glow of instant messages."
    },
    "km": {
      "title": "ភាពកក់ក្តៅនៃសំបុត្រសរសេរដោយដៃ",
      "subtitle": "មូលហេតុដែលការកាន់ប៊ិចសរសេរលើក្រដាស បង្ហាញពីមនោសញ្ចេតនាជ្រាលជ្រៅជាងសារអេឡិចត្រូនិច។",
      "preview": "សំបុត្រសរសេរដោយដៃ គឺជាវត្ថុតំណាងជាក់ស្តែងនៃពេលវេលា និងសេចក្តីស្រឡាញ់ដ៏ស្មោះស្ម័គ្ររបស់មនុស្ស។",
      "content": "សំបុត្រសរសេរដោយដៃ គឺជាវត្ថុតំណាងជាក់ស្តែងនៃពេលវេលា និងសេចក្តីស្រឡាញ់ដ៏ស្មោះស្ម័គ្ររបស់មនុស្ស។<br><br>ក្នុងការជ្រើសរើសក្រដាស បូមទឹកខ្មៅ និងការទាញដៃសរសេរលើទំព័រ អ្នកសរសេរបានលះបង់ពេលវេលាដ៏មានតម្លៃរបស់ខ្លួនជូនដល់អ្នកទទួល ដែលបង្កើតបានជាចំណងមិត្តភាពយូរអង្វែង។"
    }
  },
  {
    "id": "op-4",
    "category": "opinion",
    "author": "ARCHIBALD PENDRICK",
    "date": "JULY 08, 2026",
    "dateKm": "០៨ កក្កដា ២០២៦",
    "wordCount": "1,350 WORDS",
    "wordCountKm": "១,៣៥០ ពាក្យ",
    "readTime": "6 MIN READ",
    "readTimeKm": "៦ នាទីអាន",
    "image": "assets/images/world_map_vintage.png",
    "en": {
      "title": "THE ILLUSION OF INFINITE PROGRESS",
      "subtitle": "Questioning the dogma of perpetual technological acceleration without human wisdom.",
      "preview": "Every age believes itself to be standing at the apex of historical enlightenment.",
      "content": "Every age believes itself to be standing at the apex of historical enlightenment.<br><br>Yet true civilizational maturity is measured not by how fast our messages travel, but by the depth of truth and justice those messages contain. We must slow down to understand where we are going."
    },
    "km": {
      "title": "ការបំភាន់នៃវឌ្ឍនភាពដែលគ្មានដែនកំណត់",
      "subtitle": "ការចោទសួរអំពីការបង្កើនល្បឿនបច្ចេកវិទ្យាឥតឈប់ឈរដោយគ្មានប្រាជ្ញារបស់មនុស្សជាតិ។",
      "preview": "គ្រប់យុគសម័យទាំងអស់តែងតែជឿជាក់ថា ខ្លួនកំពុងឈរនៅលើចំណុចកំពូលនៃចំណេះដឹងប្រវត្តិសាស្ត្រ។",
      "content": "គ្រប់យុគសម័យទាំងអស់តែងតែជឿជាក់ថា ខ្លួនកំពុងឈរនៅលើចំណុចកំពូលនៃចំណេះដឹងប្រវត្តិសាស្ត្រ។<br><br>ប៉ុន្តែភាពចាស់ទុំនៃអរិយធម៌ពិតប្រាកដ មិនត្រូវបានវាស់វែងដោយល្បឿននៃការបញ្ជូនសារនោះទេ គឺវាស់វែងដោយភាពត្រឹមត្រូវ និងយុត្តិធម៌ដែលសារនោះផ្ទុកទៅវិញទេ។ យើងត្រូវតែបន្ថយល្បឿនដើម្បីស្វែងយល់ពីទិសដៅរបស់យើង។"
    }
  },
  {
    "id": "op-5",
    "category": "opinion",
    "author": "MONIQUE LEFEVRE",
    "date": "JULY 07, 2026",
    "dateKm": "០៧ កក្កដា ២០២៦",
    "wordCount": "1,150 WORDS",
    "wordCountKm": "១,១៥០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/vintage_typewriter.png",
    "en": {
      "title": "IN DEFENSE OF COTTAGE PUBLISHING",
      "subtitle": "Why small-batch independent presses are the true guardians of intellectual freedom.",
      "preview": "When giant conglomerates control social feeds, the small basement printing press becomes a revolutionary sanctuary.",
      "content": "When giant conglomerates control social feeds, the small basement printing press becomes a revolutionary sanctuary.<br><br>Independent publishers printing two hundred copies on hand-cranked cylinder presses are immune to corporate de-platforming, algorithms, and sudden policy shifts."
    },
    "km": {
      "title": "ការការពារការបោះពុម្ពផ្សាយខ្នាតតូចបែបសិប្បកម្ម",
      "subtitle": "មូលហេតុដែលរោងពុម្ពឯករាជ្យខ្នាតតូច គឺជាអ្នកការពារសេរីភាពបញ្ញាពិតប្រាកដ។",
      "preview": "នៅពេលដែលក្រុមហ៊ុនធំៗគ្រប់គ្រងបណ្តាញសង្គម រោងពុម្ពខ្នាតតូចបានក្លាយជាកន្លែងការពារសេរីភាពដ៏រឹងមាំ។",
      "content": "នៅពេលដែលក្រុមហ៊ុនធំៗគ្រប់គ្រងបណ្តាញសង្គម រោងពុម្ពខ្នាតតូចបានក្លាយជាកន្លែងការពារសេរីភាពដ៏រឹងមាំ។<br><br>អ្នកបោះពុម្ពផ្សាយឯករាជ្យដែលបោះពុម្ពសៀវភៅត្រឹមតែពីរបីរយក្បាលដោយម៉ាស៊ីនបង្វិលដៃ មិនរងការគាបសង្កត់ពីក្បួនដោះស្រាយ ឬការផ្លាស់ប្តូរគោលការណ៍របស់ក្រុមហ៊ុនបច្ចេកវិទ្យាឡើយ។"
    }
  },
  {
    "id": "op-6",
    "category": "opinion",
    "author": "SAMBATH NOUV",
    "date": "JULY 06, 2026",
    "dateKm": "០៦ កក្កដា ២០២៦",
    "wordCount": "1,200 WORDS",
    "wordCountKm": "១,២០០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/printing_press.png",
    "en": {
      "title": "SILENCE AS A FUNDAMENTAL HUMAN RIGHT",
      "subtitle": "Reclaiming acoustic and mental space in an era of pervasive ambient advertising.",
      "preview": "Urban architecture and digital environments are increasingly engineered to deny citizens quiet contemplation.",
      "content": "Urban architecture and digital environments are increasingly engineered to deny citizens quiet contemplation.<br><br>We must recognize quietude not as an expensive luxury for the elite, but as an essential civic right necessary for mental sanity and creative thought."
    },
    "km": {
      "title": "ភាពស្ងប់ស្ងាត់ជាសិទ្ធិមនុស្សជាមូលដ្ឋាន",
      "subtitle": "ការទាមទារយកមកវិញនូវលំហសូរសំឡេង និងផ្លូវចិត្ត ក្នុងយុគសម័យនៃការផ្សាយពាណិជ្ជកម្មគ្រប់ទីកន្លែង។",
      "preview": "ស្ថាបត្យកម្មទីក្រុង និងបរិយាកាសឌីជីថល កំពុងត្រូវបានរចនាឡើងដើម្បីកាត់បន្ថយពេលវេលាស្ងប់ស្ងាត់របស់ប្រជាពលរដ្ឋ។",
      "content": "ស្ថាបត្យកម្មទីក្រុង និងបរិយាកាសឌីជីថល កំពុងត្រូវបានរចនាឡើងដើម្បីកាត់បន្ថយពេលវេលាស្ងប់ស្ងាត់របស់ប្រជាពលរដ្ឋ។<br><br>យើងត្រូវតែទទួលស្គាល់ថា ភាពស្ងប់ស្ងាត់មិនមែនជាការចំណាយដ៏ខ្ជះខ្ជាយសម្រាប់អ្នកមាននោះទេ ប៉ុន្តែវាជាសិទ្ធិជាមូលដ្ឋានដែលចាំបាច់សម្រាប់សុខភាពផ្លូវចិត្ត និងការគិតប្រកបដោយភាពច្នៃប្រឌិត។"
    }
  },
  {
    "id": "op-7",
    "category": "opinion",
    "author": "GIDEON CROSS",
    "date": "JULY 05, 2026",
    "dateKm": "០៥ កក្កដា ២០២៦",
    "wordCount": "1,050 WORDS",
    "wordCountKm": "១,០៥០ ពាក្យ",
    "readTime": "4 MIN READ",
    "readTimeKm": "៤ នាទីអាន",
    "image": "assets/images/vintage_stationery.png",
    "en": {
      "title": "THE TYRANNY OF THE INSTANT REPLY",
      "subtitle": "How asynchronous correspondence restores thoughtfulness to personal and professional life.",
      "preview": "The expectation that every message demands an instantaneous response has eroded nuance.",
      "content": "The expectation that every message demands an instantaneous response has eroded nuance.<br><br>When we permit ourselves days rather than seconds to formulate our thoughts, diplomacy replaces rage, and prose replaces reactive noise."
    },
    "km": {
      "title": "សម្ពាធនៃការឆ្លើយតបសារភ្លាមៗ",
      "subtitle": "របៀបដែលការឆ្លើយឆ្លងតាមពេលវេលាសមស្រប ជួយស្តារការគិតពិចារណាក្នុងជីវិតផ្ទាល់ខ្លួន និងការងារ។",
      "preview": "ការរំពឹងទុកថារាល់សារទាំងអស់ត្រូវតែឆ្លើយតបភ្លាមៗ បានបំផ្លាញនូវភាពស៊ីជម្រៅនៃគំនិត។",
      "content": "ការរំពឹងទុកថារាល់សារទាំងអស់ត្រូវតែឆ្លើយតបភ្លាមៗ បានបំផ្លាញនូវភាពស៊ីជម្រៅនៃគំនិត។<br><br>នៅពេលដែលយើងអនុញ្ញាតឱ្យខ្លួនយើងមានពេលគិតពិចារណាមុននឹងឆ្លើយតប ការយល់យោគគ្នានឹងជំនួសឱ្យកំហឹង ហើយការសន្ទនាប្រកបដោយការគិតនឹងជំនួសឱ្យសំឡេងរំខាន។"
    }
  },
  {
    "id": "op-8",
    "category": "opinion",
    "author": "KANYA SOTH",
    "date": "JULY 04, 2026",
    "dateKm": "០៤ កក្កដា ២០២៦",
    "wordCount": "1,300 WORDS",
    "wordCountKm": "១,៣០០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/world_map_vintage.png",
    "en": {
      "title": "THE WISDOM OF INDIGENOUS CARTOGRAPHY",
      "subtitle": "Mapping lands through rivers, constellations, and oral songs rather than arbitrary borders.",
      "preview": "Modern Western cartography has reduced landscapes to sterile grids of property and exploitation.",
      "content": "Modern Western cartography has reduced landscapes to sterile grids of property and exploitation.<br><br>Indigenous mapping practices treat the earth as a living web of relationships, where a mountain is not an elevation contour but an ancestor."
    },
    "km": {
      "title": "ប្រាជ្ញានៃការគូរផែនទីបែបជនជាតិដើមភាគតិច",
      "subtitle": "ការកំណត់ព្រំដែនដីតាមរយៈទន្លេ ក្រុមផ្កាយ និងចម្រៀងប្រពៃណី ជាជាងបន្ទាត់សិប្បនិម្មិត។",
      "preview": "ការគូរផែនទីលោកខាងលិចសម័យទំនើប បានកាត់បន្ថយទិដ្ឋភាពដីធ្លីឱ្យនៅត្រឹមតែក្រឡាចត្រង្គនៃការទាញយកផលប្រយោជន៍។",
      "content": "ការគូរផែនទីលោកខាងលិចសម័យទំនើប បានកាត់បន្ថយទិដ្ឋភាពដីធ្លីឱ្យនៅត្រឹមតែក្រឡាចត្រង្គនៃការទាញយកផលប្រយោជន៍។<br><br>ការគូរផែនទីរបស់ជនជាតិដើមភាគតិចចាត់ទុកផែនដីជាបណ្តាញនៃទំនាក់ទំនងរស់រវើក ដែលភ្នំមួយមិនមែនគ្រាន់តែជាកំពស់ដីនោះទេ ប៉ុន្តែជាបុព្វបុរស។"
    }
  },
  {
    "id": "op-9",
    "category": "opinion",
    "author": "BARNABY CLINTON",
    "date": "JULY 03, 2026",
    "dateKm": "០៣ កក្កដា ២០២៦",
    "wordCount": "1,100 WORDS",
    "wordCountKm": "១,១០០ ពាក្យ",
    "readTime": "5 MIN READ",
    "readTimeKm": "៥ នាទីអាន",
    "image": "assets/images/vintage_typewriter.png",
    "en": {
      "title": "WHY PHYSICAL LIBRARIES REMAIN THE FORTRESSES OF DEMOCRACY",
      "subtitle": "Public book repositories protect collective human knowledge from silent digital revision.",
      "preview": "Digital books can be quietly updated, censored, or revoked at the whim of remote platform servers.",
      "content": "Digital books can be quietly updated, censored, or revoked at the whim of remote platform servers.<br><br>A physical library shelf housing thousands of printed volumes is an immutable physical blockchain of human truth, immune to retroactive censorship."
    },
    "km": {
      "title": "មូលហេតុដែលបណ្ណាល័យក្រដាសនៅតែជាបន្ទាយនៃប្រជាធិបតេយ្យ",
      "subtitle": "ឃ្លាំងសៀវភៅសាធារណៈការពារចំណេះដឹងមនុស្សជាតិពីការលួចកែប្រែដោយស្ងាត់ៗតាមប្រព័ន្ធឌីជីថល។",
      "preview": "សៀវភៅឌីជីថលអាចត្រូវបានកែប្រែ ត្រួតពិនិត្យ ឬលុបចោលយ៉ាងងាយស្រួលដោយម៉ាស៊ីនបម្រើពីចម្ងាយ។",
      "content": "សៀវភៅឌីជីថលអាចត្រូវបានកែប្រែ ត្រួតពិនិត្យ ឬលុបចោលយ៉ាងងាយស្រួលដោយម៉ាស៊ីនបម្រើពីចម្ងាយ។<br><br>ធ្នើសៀវភៅក្នុងបណ្ណាល័យដែលផ្ទុកសៀវភៅបោះពុម្ពរាប់ពាន់ក្បាល គឺជាបណ្តាញផ្ទុកទិន្នន័យជាក់ស្តែងនៃការពិតរបស់មនុស្សជាតិ ដែលមិនអាចកែប្រែតាមទំនើងចិត្តបានឡើយ។"
    }
  },
  {
    "id": "op-10",
    "category": "opinion",
    "author": "CHARLOTTE BRONTE-HAYES",
    "date": "JULY 02, 2026",
    "dateKm": "០២ កក្កដា ២០២៦",
    "wordCount": "1,400 WORDS",
    "wordCountKm": "១,៤០០ ពាក្យ",
    "readTime": "6 MIN READ",
    "readTimeKm": "៦ នាទីអាន",
    "image": "assets/images/printing_press.png",
    "en": {
      "title": "THE NOBILITY OF THE CRAFTSMAN'S TOUCH",
      "subtitle": "In praise of imperfection, handmade goods, and human craftsmanship over algorithmic clones.",
      "preview": "There is a quiet spiritual resonance in an object shaped by human fingers that machines can never duplicate.",
      "content": "There is a quiet spiritual resonance in an object shaped by human fingers that machines can never duplicate.<br><br>The slight variation in ink density on a printed page, the subtle grain of leather binding, the uneven strike of a typewriter key — these are not flaws, but the unmistakable fingerprints of our humanity."
    },
    "km": {
      "title": "ភាពថ្លៃថ្នូរនៃស្នាដៃសិប្បករផ្ទាល់ដៃ",
      "subtitle": "ការសរសើរចំពោះភាពមិនល្អឥតខ្ចោះនៃទំនិញធ្វើដោយដៃ និងជំនាញរបស់មនុស្សលើសពីការចម្លងដោយម៉ាស៊ីន។",
      "preview": "មានមនោសញ្ចេតនាដ៏ជ្រាលជ្រៅនៅក្នុងវត្ថុដែលបង្កើតឡើងដោយដៃរបស់មនុស្ស ដែលម៉ាស៊ីនមិនអាចចម្លងបានឡើយ។",
      "content": "មានមនោសញ្ចេតនាដ៏ជ្រាលជ្រៅនៅក្នុងវត្ថុដែលបង្កើតឡើងដោយដៃរបស់មនុស្ស ដែលម៉ាស៊ីនមិនអាចចម្លងបានឡើយ។<br><br>ភាពខុសគ្នាបន្តិចបន្តួចនៃកម្រិតទឹកខ្មៅលើទំព័រ សរសៃនៃស្បែកសៀវភៅ និងស្នាមវាយអង្គុលីលេខ — ទាំងនេះមិនមែនជាកំហុសនោះទេ ប៉ុន្តែជាស្នាមផ្តិតនៃមនុស្សជាតិរបស់យើង។"
    }
  }
]
;

// --- Market / News Ticker Feed ---
const TICKER_ITEMS_EN = [
    "DOW JONES NEWS PRINT INDEX... +1.45%",
    "SILVER BULLION SPOT... 24.50s",
    "BTC TELEGRAPHIC NETWORK... VALUE UP",
    "WEATHER WARNING: SEA GALES IN SOUTH CHANNEL",
    "FINE COAL CO. REPORTS STABLE INVENTORY",
    "NEW PAPER MILL OPENS IN MANCHESTER",
    "CABLE CONNECTIVITY CONFIRMED FROM HALIFAX TO VALENTIA"
];

const TICKER_ITEMS_KM = [
    "សន្ទស្សន៍បោះពុម្ពព័ត៌មាន ដោ ចូនស៍... +១.៤៥%",
    "តម្លៃប្រាក់ដុំនៅលើទីផ្សារ... ២៤.៥០ ស៊ីលីង",
    "បណ្តាញទូរលេខ BTC... តម្លៃកើនឡើង",
    "ការព្រមានអំពីអាកាសធាតុ៖ ខ្យល់ព្យុះសមុទ្រនៅច្រកសមុទ្រខាងត្បូង",
    "ក្រុមហ៊ុនធ្យូងថ្មល្អរាយការណ៍ពីសារពើភ័ណ្ឌស្ថិរភាព",
    "រោងម៉ាស៊ីនកិនក្រដាសថ្មីបើកនៅទីក្រុង Manchester",
    "ការភ្ជាប់ខ្សែទូរលេខត្រូវបានបញ្ជាក់ពី Halifax ទៅ Valentia"
];

// --- App State ---
let currentCategory = "all";
let searchQuery = "";
let currentLanguage = localStorage.getItem("chronograph_lang") || "en";
let bookmarkedArticles = JSON.parse(localStorage.getItem("chronograph_bookmarks")) || [];
let readerFontSizeMultiplier = 1.0;
let ttsInstance = null;
let ttsAudioPlayer = null;
let ttsAudioQueue = [];
let ttsAudioIndex = 0;
let heroSliderInterval = null;
let heroSliderIdx = 0;

// --- DOM Elements & Safe Helper Functions ---
let articlesGrid = null;
let bulletinsList = null;
let opinionList = null;
let tickerContent = null;
let liveTimeEl = null;
let themeToggle = null;
let bookmarkToggleBtn = null;
let bookmarkCountEl = null;
let searchInput = null;
let searchBtn = null;
let navLinks = [];
let widgetTemp = null;
let widgetDesc = null;
let weatherWidgetTop = null;
let weatherCityInput = null;
let weatherCityBtn = null;
let newsletterForm = null;
let newsletterEmail = null;
let newsletterStatus = null;
let stampConfirmed = null;
let articleModal = null;
let modalArticleContent = null;
let modalClose = null;
let fontDecBtn = null;
let fontIncBtn = null;
let readerTtsBtn = null;
let readerBookmarkBtn = null;
let readerPrintBtn = null;

function queryDOMElements() {
    articlesGrid = document.getElementById("main-articles-grid");
    bulletinsList = document.getElementById("bulletins-list");
    opinionList = document.getElementById("opinion-list");
    tickerContent = document.getElementById("ticker-content");
    liveTimeEl = document.getElementById("live-time");
    themeToggle = document.getElementById("theme-toggle");
    bookmarkToggleBtn = document.getElementById("bookmark-toggle-btn");
    bookmarkCountEl = document.getElementById("bookmark-count");
    searchInput = document.getElementById("search-input");
    searchBtn = document.getElementById("search-btn");
    navLinks = Array.from(document.querySelectorAll(".nav-link"));
    widgetTemp = document.getElementById("widget-temp");
    widgetDesc = document.getElementById("widget-desc");
    weatherWidgetTop = document.getElementById("weather-widget");
    weatherCityInput = document.getElementById("weather-city");
    weatherCityBtn = document.getElementById("weather-city-btn");
    newsletterForm = document.getElementById("newsletter-form");
    newsletterEmail = document.getElementById("newsletter-email");
    newsletterStatus = document.getElementById("newsletter-status");
    stampConfirmed = document.getElementById("stamp-confirmed");
    articleModal = document.getElementById("article-modal");
    modalArticleContent = document.getElementById("modal-article-content");
    modalClose = document.getElementById("modal-close");
    fontDecBtn = document.getElementById("reader-font-dec");
    fontIncBtn = document.getElementById("reader-font-inc");
    readerTtsBtn = document.getElementById("reader-tts");
    readerBookmarkBtn = document.getElementById("reader-bookmark");
    readerPrintBtn = document.getElementById("reader-print");
}

function safeText(idOrEl, text) {
    const el = typeof idOrEl === "string" ? document.getElementById(idOrEl) : idOrEl;
    if (el && text !== undefined && text !== null) el.textContent = text;
}

function safeHTML(idOrEl, html) {
    const el = typeof idOrEl === "string" ? document.getElementById(idOrEl) : idOrEl;
    if (el && html !== undefined && html !== null) el.innerHTML = html;
}

// --- Initialization Runner (Isolated try-catch blocks) ---
function initializeApp() {
    console.log("Initializing ANR Daily News application...");
    try { queryDOMElements(); } catch (e) { console.error("Error in queryDOMElements:", e); }
    try { initCustomData(); } catch (e) { console.error("Error in initCustomData:", e); }
    try { initFirebaseCloud(); } catch (e) { console.error("Error in initFirebaseCloud:", e); }
    try { initClock(); } catch (e) { console.error("Error in initClock:", e); }
    try { initTicker(); } catch (e) { console.error("Error in initTicker:", e); }
    try { initTheme(); } catch (e) { console.error("Error in initTheme:", e); }
    try { translateUI(); } catch (e) { console.error("Error in translateUI:", e); }
    try { setupEventListeners(); } catch (e) { console.error("Error in setupEventListeners:", e); }
    try { initAdminPanel(); } catch (e) { console.error("Error in initAdminPanel:", e); }
    console.log("ANR Daily News initialized successfully.");
}

// Auto-run on DOM ready or immediately if already loaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
} else {
    initializeApp();
}

// --- Functions ---

// Live clock updates in typewriter style
function initClock() {
    const updateTime = () => {
        const now = new Date();
        const daysEn = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        const monthsEn = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        
        const daysKm = ["ថ្ងៃអាទិត្យ", "ថ្ងៃច័ន្ទ", "ថ្ងៃអង្គារ", "ថ្ងៃពុធ", "ថ្ងៃព្រហស្បតិ៍", "ថ្ងៃសុក្រ", "ថ្ងៃសៅរ៍"];
        const monthsKm = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];

        const isKm = currentLanguage === "km";
        const days = isKm ? daysKm : daysEn;
        const months = isKm ? monthsKm : monthsEn;

        const dayName = days[now.getDay()];
        const monthName = months[now.getMonth()];
        const date = now.getDate();
        const year = now.getFullYear();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        if (isKm) {
            // Translate digits for year, day, time to Khmer (optional but looks beautiful)
            const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
            const toKhmerNum = (numStr) => numStr.toString().split("").map(c => khmerDigits[c] || c).join("");
            
            const timeStr = `${toKhmerNum(hours)}:${toKhmerNum(minutes)}:${toKhmerNum(seconds)}`;
            liveTimeEl.textContent = `${dayName}, ថ្ងៃទី ${toKhmerNum(date)} ខែ ${monthName} ឆ្នាំ ${toKhmerNum(year)} — ${timeStr}`;
        } else {
            liveTimeEl.textContent = `${dayName}, ${monthName} ${date}, ${year} — ${hours}:${minutes}:${seconds}`;
        }
    };
    updateTime();
    setInterval(updateTime, 1000);
}

// Infinite scrolling news ticker
function initTicker() {
    const items = currentLanguage === "km" ? TICKER_ITEMS_KM : TICKER_ITEMS_EN;
    tickerContent.innerHTML = items.join(" &nbsp;&bull;&nbsp; ") + " &nbsp;&bull;&nbsp; " + items.join(" &nbsp;&bull;&nbsp; ");
}

// Handle retro/dark theme state
function initTheme() {
    const savedTheme = localStorage.getItem("chronograph_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeButtonText(savedTheme);
}

function updateThemeButtonText(theme) {
    const t = TRANSLATIONS[currentLanguage];
    themeToggle.textContent = theme === "dark" ? t.dayEdition : t.nightEdition;
}

// Render Bulletins left sidebar
function renderBulletins() {
    bulletinsList.innerHTML = BULLETINS.map(b => {
        const text = currentLanguage === "km" ? b.km : b.en;
        const meta = currentLanguage === "km" ? "ទាន់ហេតុការណ៍" : "FLASH";
        return `
            <div class="bulletin-item">
                <span class="bulletin-meta">${b.time} &bull; ${meta}</span>
                <p class="bulletin-text">${text}</p>
            </div>
        `;
    }).join("");
}

// Render Opinions right sidebar
function renderOpinions() {
    const opinions = ARTICLES_DB.filter(a => a.category === "opinion");
    opinionList.innerHTML = opinions.map(op => {
        const contentLang = op[currentLanguage];
        return `
            <div class="opinion-item">
                <span class="opinion-author">${op.author}</span>
                <h4 class="opinion-title"><a href="#" onclick="openArticleModal('${op.id}'); return false;">${contentLang.title}</a></h4>
                <p class="opinion-lead">${contentLang.preview}</p>
            </div>
        `;
    }).join("");
}

// Render main article feed
function renderArticles() {
    articlesGrid.innerHTML = "";
    const t = TRANSLATIONS[currentLanguage];

    // Filter logic
    let filtered = ARTICLES_DB.filter(a => a.category !== "opinion");

    if (currentCategory === "saved") {
        filtered = ARTICLES_DB.filter(a => bookmarkedArticles.includes(a.id));
    } else if (currentCategory !== "all") {
        filtered = filtered.filter(a => a.category === currentCategory);
    }

    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = ARTICLES_DB.filter(a => {
            const contentLang = a[currentLanguage];
            return contentLang.title.toLowerCase().includes(query) ||
                   contentLang.preview.toLowerCase().includes(query) ||
                   contentLang.content.toLowerCase().includes(query);
        });
    }

    if (filtered.length === 0) {
        articlesGrid.innerHTML = `
            <div class="news-card hero">
                <span class="card-category">${t.emptyArchive}</span>
                <h2 class="card-title">${t.noCorrespondence}</h2>
                <p class="card-body-preview">${t.emptyDesc}</p>
            </div>
        `;
        return;
    }

    filtered.forEach((art, index) => {
        const isHero = index === 0 && currentCategory === "all" && !searchQuery;
        const isSaved = bookmarkedArticles.includes(art.id);
        const bookmarkIcon = isSaved ? "★" : "☆";
        const contentLang = art[currentLanguage];
        const readTimeStr = currentLanguage === "km" ? art.readTimeKm : art.readTime;
        const categoryUpper = currentLanguage === "km" ? t.nav[art.category] || art.category : art.category.toUpperCase();

        if (isHero) {
            articlesGrid.innerHTML += `
                <article class="news-card hero" id="hero-article-card">
                    <span class="card-category" id="hero-card-category"></span>
                    <h3 class="card-title" id="hero-card-title" onclick="openHeroArticle()"></h3>
                    <div class="card-meta">
                        <span id="hero-card-meta"></span>
                        <button class="bookmark-icon-btn" id="hero-card-bookmark" onclick="toggleHeroBookmark(event)" title="${t.save}">
                            ${bookmarkIcon}
                        </button>
                    </div>
                    <div class="hero-slider-wrap">
                        <div class="slides-container"></div>
                        <div class="slider-controls mono-text">
                            <button class="slide-nav-btn prev-slide">[◀] PREV</button>
                            <span class="slide-indicator">01 / 05</span>
                            <button class="slide-nav-btn next-slide">NEXT [▶]</button>
                        </div>
                    </div>
                    <p class="card-body-preview drop-cap" id="hero-card-preview"></p>
                    <span class="read-more-btn" id="hero-card-readmore" onclick="openHeroArticle()">${t.readDispatch} &rarr;</span>
                </article>
            `;
        } else {
            articlesGrid.innerHTML += `
                <article class="news-card">
                    <span class="card-category">${categoryUpper}</span>
                    <h3 class="card-title" onclick="openArticleModal('${art.id}')">${contentLang.title}</h3>
                    <div class="card-meta">
                        <span>${t.by} ${art.author} &bull; ${readTimeStr}</span>
                        <button class="bookmark-icon-btn" onclick="toggleBookmark('${art.id}', event)" title="${isSaved ? t.unsave : t.save}">
                            ${bookmarkIcon}
                        </button>
                    </div>
                    ${art.image ? `
                    <div class="card-img-wrap" onclick="openArticleModal('${art.id}')">
                        <img src="${art.image}" alt="${contentLang.title} Image">
                    </div>
                    ` : ""}
                    <p class="card-body-preview">${contentLang.preview}</p>
                    <span class="read-more-btn" onclick="openArticleModal('${art.id}')">${t.readDispatch} &rarr;</span>
                </article>
            `;
        }
    });

    initHeroSlider();
}

function initHeroSlider() {
    const sliderWrap = document.querySelector(".hero-slider-wrap");
    if (!sliderWrap) return;

    // Clear any existing active interval to prevent duplicate timers
    if (heroSliderInterval) {
        clearInterval(heroSliderInterval);
        heroSliderInterval = null;
    }

    const slideArticles = ARTICLES_DB.filter(a => a.image).slice(0, 5);
    const container = sliderWrap.querySelector(".slides-container");
    const indicator = sliderWrap.querySelector(".slide-indicator");
    
    if (slideArticles.length === 0) return;
    
    container.innerHTML = slideArticles.map((art, idx) => {
        const contentLang = art[currentLanguage];
        const activeClass = idx === 0 ? "active" : "";
        return `
            <div class="hero-slide ${activeClass}" data-index="${idx}" onclick="openHeroArticle()">
                <img src="${art.image}" alt="${contentLang.title} Image">
            </div>
        `;
    }).join("");

    const showSlide = (idx) => {
        const slides = container.querySelectorAll(".hero-slide");
        if (slides.length === 0) return;
        
        if (idx >= slides.length) idx = 0;
        if (idx < 0) idx = slides.length - 1;
        
        heroSliderIdx = idx;
        
        slides.forEach((slide, sIdx) => {
            if (sIdx === heroSliderIdx) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
            }
        });

        indicator.textContent = `${String(heroSliderIdx + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;

        // Sync with outer hero card elements
        const currentArt = slideArticles[heroSliderIdx];
        if (currentArt) {
            const isKm = currentLanguage === "km";
            const contentLang = currentArt[currentLanguage];
            const t = TRANSLATIONS[currentLanguage];
            
            const catLabel = isKm ? (t.nav[currentArt.category] || currentArt.category) : currentArt.category.toUpperCase();
            const readTimeStr = isKm ? currentArt.readTimeKm : currentArt.readTime;
            
            const catEl = document.getElementById("hero-card-category");
            const titleEl = document.getElementById("hero-card-title");
            const metaEl = document.getElementById("hero-card-meta");
            const prevEl = document.getElementById("hero-card-preview");
            const bookmarkEl = document.getElementById("hero-card-bookmark");

            if (catEl) catEl.textContent = catLabel;
            if (titleEl) titleEl.textContent = contentLang.title;
            if (metaEl) metaEl.innerHTML = `${t.by} ${currentArt.author} &bull; ${readTimeStr}`;
            if (prevEl) prevEl.textContent = contentLang.preview;
            
            if (bookmarkEl) {
                const isSaved = bookmarkedArticles.includes(currentArt.id);
                bookmarkEl.textContent = isSaved ? "★" : "☆";
                bookmarkEl.title = isSaved ? t.unsave : t.save;
            }
        }
    };

    const startAutoplay = () => {
        stopAutoplay();
        heroSliderInterval = setInterval(() => {
            showSlide(heroSliderIdx + 1);
        }, 5000);
    };

    const stopAutoplay = () => {
        if (heroSliderInterval) {
            clearInterval(heroSliderInterval);
            heroSliderInterval = null;
        }
    };

    // Bind navigation buttons
    const prevBtn = sliderWrap.querySelector(".prev-slide");
    const nextBtn = sliderWrap.querySelector(".next-slide");

    if (prevBtn) {
        prevBtn.onclick = (e) => {
            e.stopPropagation();
            showSlide(heroSliderIdx - 1);
            startAutoplay();
        };
    }

    if (nextBtn) {
        nextBtn.onclick = (e) => {
            e.stopPropagation();
            showSlide(heroSliderIdx + 1);
            startAutoplay();
        };
    }

    sliderWrap.onmouseenter = stopAutoplay;
    sliderWrap.onmouseleave = startAutoplay;

    // Define globally accessible click actions
    window.openHeroArticle = () => {
        const activeArt = slideArticles[heroSliderIdx];
        if (activeArt) openArticleModal(activeArt.id);
    };

    window.toggleHeroBookmark = (e) => {
        if (e) e.stopPropagation();
        const activeArt = slideArticles[heroSliderIdx];
        if (activeArt) {
            toggleBookmark(activeArt.id, e);
            const bookmarkEl = document.getElementById("hero-card-bookmark");
            if (bookmarkEl) {
                const isSaved = bookmarkedArticles.includes(activeArt.id);
                bookmarkEl.textContent = isSaved ? "★" : "☆";
            }
        }
    };

    // Load initial slide details
    showSlide(0);
    startAutoplay();
}

// --- Bookmarking Actions ---
function toggleBookmark(id, event) {
    if (event) event.stopPropagation();
    const t = TRANSLATIONS[currentLanguage];

    const index = bookmarkedArticles.indexOf(id);
    if (index > -1) {
        bookmarkedArticles.splice(index, 1);
        showToast(t.toastUnbookmarked);
    } else {
        bookmarkedArticles.push(id);
        showToast(t.toastBookmarked);
    }

    localStorage.setItem("chronograph_bookmarks", JSON.stringify(bookmarkedArticles));
    updateBookmarkUI();
    renderArticles();
}

function updateBookmarkUI() {
    const count = bookmarkedArticles.length;
    bookmarkCountEl.textContent = count;

    // Update active state of Saved menu item
    if (currentCategory === "saved") {
        navLinks.forEach(link => link.classList.remove("active"));
        const savedLink = Array.from(navLinks).find(l => l.getAttribute("data-category") === "saved");
        if (savedLink) savedLink.classList.add("active");
    }
}

// --- Toast alert helper ---
function showToast(msg) {
    const existing = document.querySelector(".toast-msg");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// --- Article Reader Modal ---
function openArticleModal(id) {
    const art = ARTICLES_DB.find(a => a.id === id);
    if (!art) return;

    const t = TRANSLATIONS[currentLanguage];
    const isSaved = bookmarkedArticles.includes(art.id);
    const contentLang = art[currentLanguage];

    const dateStr = currentLanguage === "km" ? art.dateKm : art.date;
    const wordCountStr = currentLanguage === "km" ? art.wordCountKm : art.wordCount;
    const readTimeStr = currentLanguage === "km" ? art.readTimeKm : art.readTime;
    const categoryUpper = currentLanguage === "km" ? t.nav[art.category] || art.category : art.category.toUpperCase();

    // Populate content
    modalArticleContent.innerHTML = `
        <span class="card-category">${categoryUpper}</span>
        <h2>${contentLang.title}</h2>
        ${contentLang.subTitle ? `<p class="lead">${contentLang.subTitle}</p>` : ""}
        <div class="modal-meta">
            <span>${t.by} ${art.author} &bull; ${dateStr}</span>
            <span>${wordCountStr} &bull; ${readTimeStr}</span>
        </div>
        <div class="modal-article-body">
            ${contentLang.content}
        </div>
    `;

    // Reset size adjustment
    readerFontSizeMultiplier = 1.0;
    applyFontSize();

    // Reset TTS
    stopTTS();

    // Set Save Button state
    updateModalBookmarkBtn(isSaved);

    // Connect controls to current article ID
    readerBookmarkBtn.onclick = () => {
        toggleBookmark(art.id);
        const active = bookmarkedArticles.includes(art.id);
        updateModalBookmarkBtn(active);
    };

    readerTtsBtn.onclick = () => toggleTTS(art);
    readerPrintBtn.onclick = () => window.print();

    // Show modal
    articleModal.classList.add("active");
    articleModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Disable background scrolling
}

function updateModalBookmarkBtn(isBookmarked) {
    const t = TRANSLATIONS[currentLanguage];
    readerBookmarkBtn.textContent = isBookmarked ? t.unsave : t.save;
    readerBookmarkBtn.classList.toggle("active", isBookmarked);
}

function closeArticleModal() {
    articleModal.classList.remove("active");
    articleModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
    stopTTS();
}

function applyFontSize() {
    modalArticleContent.style.fontSize = `${readerFontSizeMultiplier * 1.15}rem`;
}

// --- Text to Speech (TTS) ---
function toggleTTS(art) {
    if (('speechSynthesis' in window && window.speechSynthesis.speaking) || ttsAudioPlayer) {
        stopTTS();
        return;
    }

    const t = TRANSLATIONS[currentLanguage];
    const contentLang = art[currentLanguage];
    
    // Gather speech text
    const isKm = currentLanguage === "km";
    const bodyTextEl = modalArticleContent.querySelector(".modal-article-body");
    const bodyText = bodyTextEl ? bodyTextEl.innerText : "";
    const textContent = isKm
        ? `${contentLang.title}។ ${contentLang.subTitle || ""}។ និពន្ធដោយ ${art.author}។ ${bodyText}`
        : `${contentLang.title}. ${contentLang.subTitle || ""}. Written by ${art.author}. ${bodyText}`;

    if (isKm) {
        // Check if there are native Khmer voices installed
        const voices = window.speechSynthesis.getVoices();
        const kmVoices = voices.filter(v => {
            const l = v.lang.toLowerCase();
            return l.startsWith("km") || l.includes("kh") || v.name.toLowerCase().includes("khmer");
        });

        if (kmVoices.length > 0) {
            playNativeTTS(textContent, kmVoices, t);
        } else {
            playGoogleTTSQueue(textContent, t);
        }
    } else {
        playNativeTTS(textContent, null, t);
    }
}

function playNativeTTS(text, kmVoices, t) {
    if (!('speechSynthesis' in window)) {
        showToast(t.toastTtsUnsupported);
        return;
    }

    ttsInstance = new SpeechSynthesisUtterance(text);
    ttsInstance.rate = 1.0;
    ttsInstance.pitch = 0.95;

    const voices = window.speechSynthesis.getVoices();
    let voice = null;

    if (kmVoices) {
        voice = kmVoices.find(v => {
            const name = v.name.toLowerCase();
            return name.includes("sreypich") || name.includes("female") || name.includes("google") || name.includes("online");
        }) || kmVoices[0];
        ttsInstance.lang = "km-KH";
    } else {
        voice = voices.find(v => v.lang.toLowerCase().startsWith("en"));
        ttsInstance.lang = "en-US";
    }

    if (voice) {
        ttsInstance.voice = voice;
    }

    ttsInstance.onend = () => {
        readerTtsBtn.textContent = t.speak;
        readerTtsBtn.classList.remove("active");
    };

    window.speechSynthesis.speak(ttsInstance);
    readerTtsBtn.textContent = t.stop;
    readerTtsBtn.classList.add("active");
}

function playGoogleTTSQueue(text, t) {
    const sentences = text.split(/([។\.\?\!])/);
    const chunks = [];
    let currentChunk = "";

    for (let i = 0; i < sentences.length; i++) {
        const segment = sentences[i];
        if (!segment) continue;
        if (currentChunk.length + segment.length < 150) {
            currentChunk += segment;
        } else {
            if (currentChunk.trim()) {
                chunks.push(currentChunk.trim());
            }
            currentChunk = segment;
        }
    }
    if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
    }

    if (chunks.length === 0) return;

    ttsAudioQueue = chunks;
    ttsAudioIndex = 0;

    readerTtsBtn.textContent = t.stop;
    readerTtsBtn.classList.add("active");

    playNextTTSChunk(t);
}

function playNextTTSChunk(t) {
    if (ttsAudioIndex >= ttsAudioQueue.length) {
        stopTTS();
        return;
    }

    const text = ttsAudioQueue[ttsAudioIndex];
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=km&client=tw-ob&q=${encodeURIComponent(text)}`;
    
    ttsAudioPlayer = new Audio(url);
    ttsAudioPlayer.onended = () => {
        ttsAudioIndex++;
        playNextTTSChunk(t);
    };
    ttsAudioPlayer.onerror = (e) => {
        console.error("Google TTS error, skipping chunk:", e);
        ttsAudioIndex++;
        playNextTTSChunk(t);
    };

    ttsAudioPlayer.play().catch(err => {
        console.error("Google TTS play failed:", err);
        showToast("AUDIO PLAYBACK BLOCKED OR OFFLINE");
        stopTTS();
    });
}

function stopTTS() {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
    
    if (ttsAudioPlayer) {
        ttsAudioPlayer.pause();
        ttsAudioPlayer.src = "";
        ttsAudioPlayer = null;
    }
    ttsAudioQueue = [];
    ttsAudioIndex = 0;

    const t = TRANSLATIONS[currentLanguage];
    readerTtsBtn.textContent = t.speak;
    readerTtsBtn.classList.remove("active");
}

// --- Mock Weather Updater ---
const WEATHER_DESCRIPTIONS = [
    {
        en: { desc: "OVERCAST SOOTY MIST", temp: "12°C" },
        km: { desc: "អ័ព្ទផ្សែងក្រាស់", temp: "១២°C" }
    },
    {
        en: { desc: "HEAVY SOUTHEAST GALE", temp: "8°C" },
        km: { desc: "ខ្យល់ព្យុះខ្លាំងពីទិសអាគ្នេយ៍", temp: "៨°C" }
    },
    {
        en: { desc: "DRY SAND SIROCCO", temp: "34°C" },
        km: { desc: "ខ្យល់ក្តៅខ្សាច់ស្ងួត", temp: "៣៤°C" }
    },
    {
        en: { desc: "CRISP BALMY SUNSHINE", temp: "21°C" },
        km: { desc: "ពន្លឺព្រះអាទិត្យស្រទន់ស្រស់ថ្លា", temp: "២១°C" }
    },
    {
        en: { desc: "BITING SLEET FROST", temp: "1°C" },
        km: { desc: "ទឹកកកត្រជាក់ខ្លាំង", temp: "១°C" }
    },
    {
        en: { desc: "PATCHY THUNDER SHOWER", temp: "16°C" },
        km: { desc: "ភ្លៀងផ្គររន្ទះខ្លះៗ", temp: "១៦°C" }
    }
];

function updateWeather() {
    const defaultCity = currentLanguage === "km" ? "ឡុងដ៍" : "LONDON";
    const city = weatherCityInput.value.trim().toUpperCase() || defaultCity;
    const rand = WEATHER_DESCRIPTIONS[Math.floor(Math.random() * WEATHER_DESCRIPTIONS.length)];
    const t = TRANSLATIONS[currentLanguage];

    const weatherData = rand[currentLanguage];
    
    // Update labels
    widgetTemp.textContent = weatherData.temp;
    widgetDesc.textContent = weatherData.desc;

    const rawDesc = rand.en.desc;
    let weatherChar = t.weatherIconCloud;
    if (rawDesc.includes("SUNSHINE")) weatherChar = t.weatherIconSun;
    if (rawDesc.includes("GALE") || rawDesc.includes("SHOWER")) weatherChar = t.weatherIconStorm;
    if (rawDesc.includes("FROST")) weatherChar = t.weatherIconFrost;

    weatherWidgetTop.innerHTML = `${city} ${weatherData.temp} <span class="weather-icon">${weatherChar}</span>`;
    showToast(`${t.weatherUpdate}${city}`);
    weatherCityInput.value = "";
}

// --- Translate UI DOM Elements ---
function translateUI() {
    document.documentElement.setAttribute("lang", currentLanguage);
    const t = TRANSLATIONS[currentLanguage];
    if (!t) return;
    
    // Header & Buttons
    safeHTML("bookmark-toggle-btn", `${t.savedArticles} (<span id="bookmark-count">${bookmarkedArticles.length}</span>)`);
    bookmarkCountEl = document.getElementById("bookmark-count");
    
    const nextThemeText = (document.documentElement.getAttribute("data-theme") || "light") === "dark" 
        ? t.dayEdition 
        : t.nightEdition;
    safeText("theme-toggle", nextThemeText);
    safeText("language-toggle", currentLanguage === "en" ? "ភាសាខ្មែរ" : "English");

    // Masthead
    safeText("masthead-vol", t.volNo);
    safeHTML("masthead-title-text", t.mastheadTitle);
    safeText("masthead-price", t.price);
    safeText("masthead-est", t.est);
    
    // Navigation (Front Page, World, etc.)
    const links = document.querySelectorAll(".nav-link");
    links.forEach(link => {
        const cat = link.getAttribute("data-category");
        if (t.nav && t.nav[cat]) {
            link.textContent = t.nav[cat];
        }
    });

    // Ticker Title
    safeText("ticker-title-text", t.bulletins);

    // Sidebar titles
    safeText("sidebar-left-title", t.latestFlashes);
    safeText("sidebar-right-title", t.opinionEditorial);

    // Render custom ads or default vintage ads
    renderCustomAds();

    // Weather Card
    safeText("weather-detail-title", t.meteorologicalStamp);
    safeText("weather-city-btn", t.update);
    const weatherCityInputEl = document.getElementById("weather-city");
    if (weatherCityInputEl) weatherCityInputEl.placeholder = t.enterCityPlaceholder;

    // Newsletter Section
    safeText("newsletter-title-text", t.subscribeDispatch);
    safeText("newsletter-desc-text", t.deliveredMailbox);
    const newsletterEmailEl = document.getElementById("newsletter-email");
    if (newsletterEmailEl) newsletterEmailEl.placeholder = t.emailPlaceholder;
    safeText("newsletter-btn-text", t.engrave);
    safeText("stamp-confirmed", t.approved);

    // Footer Info
    safeHTML("footer-logo-text", t.footerLogo);
    safeText("footer-desc-text", t.footerDesc);
    safeText("footer-copyright-text", t.copyright);

    // Modal Control Tooltips & Labels
    const fontDecEl = document.getElementById("reader-font-dec");
    if (fontDecEl) fontDecEl.title = t.fontDecTitle;
    const fontIncEl = document.getElementById("reader-font-inc");
    if (fontIncEl) fontIncEl.title = t.fontIncTitle;
    const readerTtsEl = document.getElementById("reader-tts");
    if (readerTtsEl) {
        readerTtsEl.textContent = t.speak;
        readerTtsEl.title = t.speak;
    }
    const readerBookmarkEl = document.getElementById("reader-bookmark");
    if (readerBookmarkEl) readerBookmarkEl.title = t.save;
    const readerPrintEl = document.getElementById("reader-print");
    if (readerPrintEl) readerPrintEl.title = t.print;

    // Redraw dynamic ticker and feeds
    initTicker();
    renderBulletins();
    renderOpinions();
    renderArticles();
}

// --- Events Setup ---
function setupEventListeners() {
    // Theme Toggle
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme") || "light";
            const next = current === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("chronograph_theme", next);
            updateThemeButtonText(next);
            
            const t = TRANSLATIONS[currentLanguage];
            showToast(next === "dark" ? (currentLanguage === "km" ? "របៀបរាត្រីសកម្ម" : "NIGHT EDITION ACTIVE") : (currentLanguage === "km" ? "របៀបថ្ងៃសកម្ម" : "DAY EDITION ACTIVE"));
        });
    }

    // Language Toggle
    const langBtn = document.getElementById("language-toggle");
    if (langBtn) {
        langBtn.addEventListener("click", () => {
            currentLanguage = currentLanguage === "en" ? "km" : "en";
            localStorage.setItem("chronograph_lang", currentLanguage);
            translateUI();
            initClock(); // Re-trigger clock to format in active language
            
            const isKm = currentLanguage === "km";
            showToast(isKm ? "ភាសាត្រូវបានផ្លាស់ប្តូរទៅជា ភាសាខ្មែរ" : "Language switched to English");
        });
    }

    // Nav Category Clicks
    const links = document.querySelectorAll(".nav-link");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            currentCategory = link.getAttribute("data-category");
            searchQuery = ""; // Reset search on category toggle
            const searchInputEl = document.getElementById("search-input");
            if (searchInputEl) searchInputEl.value = "";
            renderArticles();
        });
    });

    // Saved Articles Toggle Button
    const bookmarkBtn = document.getElementById("bookmark-toggle-btn");
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener("click", () => {
            currentCategory = "saved";
            renderArticles();
            updateBookmarkUI();
        });
    }

    // Search Operations
    const searchBtnEl = document.getElementById("search-btn");
    const searchInputEl = document.getElementById("search-input");
    const performSearch = () => {
        if (searchInputEl) searchQuery = searchInputEl.value.trim();
        renderArticles();
    };
    if (searchBtnEl) searchBtnEl.addEventListener("click", performSearch);
    if (searchInputEl) {
        searchInputEl.addEventListener("keypress", (e) => {
            if (e.key === "Enter") performSearch();
        });
    }

    // Weather manual update
    const weatherBtnEl = document.getElementById("weather-city-btn");
    const weatherInputEl = document.getElementById("weather-city");
    if (weatherBtnEl) weatherBtnEl.addEventListener("click", updateWeather);
    if (weatherInputEl) {
        weatherInputEl.addEventListener("keypress", (e) => {
            if (e.key === "Enter") updateWeather();
        });
    }

    // Modal close actions
    const modalCloseEl = document.getElementById("modal-close");
    const articleModalEl = document.getElementById("article-modal");
    if (modalCloseEl) modalCloseEl.addEventListener("click", closeArticleModal);
    if (articleModalEl) {
        articleModalEl.addEventListener("click", (e) => {
            if (e.target === articleModalEl) closeArticleModal();
        });
    }
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeArticleModal();
    });

    // Modal Font adjustments
    const fontIncEl = document.getElementById("reader-font-inc");
    const fontDecEl = document.getElementById("reader-font-dec");
    if (fontIncEl) {
        fontIncEl.addEventListener("click", () => {
            if (readerFontSizeMultiplier < 1.6) {
                readerFontSizeMultiplier += 0.1;
                applyFontSize();
            }
        });
    }
    if (fontDecEl) {
        fontDecEl.addEventListener("click", () => {
            if (readerFontSizeMultiplier > 0.8) {
                readerFontSizeMultiplier -= 0.1;
                applyFontSize();
            }
        });
    }

    // Newsletter submit + typewriter rubber stamp trigger
    const newsletterFormEl = document.getElementById("newsletter-form");
    const newsletterEmailEl = document.getElementById("newsletter-email");
    const newsletterStatusEl = document.getElementById("newsletter-status");
    const stampConfirmedEl = document.getElementById("stamp-confirmed");
    if (newsletterFormEl) {
        newsletterFormEl.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = newsletterEmailEl ? newsletterEmailEl.value.trim() : "";
            const t = TRANSLATIONS[currentLanguage];
            if (email && newsletterStatusEl) {
                newsletterStatusEl.textContent = t.subscribing;
                if (newsletterEmailEl) newsletterEmailEl.disabled = true;
                const submitBtn = newsletterFormEl.querySelector("button");
                if (submitBtn) submitBtn.disabled = true;

                setTimeout(() => {
                    if (newsletterStatusEl) newsletterStatusEl.textContent = t.subscribedAt + email.toUpperCase();
                    if (stampConfirmedEl) stampConfirmedEl.classList.add("active");
                    showToast(t.subscribedToast);
                }, 1500);
            }
        });
    }
}

// ==========================================
// ANR News cPanel & Custom Data Functions
// ==========================================

// Preset Project Media Assets
const PRESET_MEDIA_ASSETS = [
    { name: "Silicon Telegraph", url: "assets/images/silicon_telegraph.png" },
    { name: "Vintage Typewriter", url: "assets/images/vintage_typewriter.png" },
    { name: "Zeppelin Routes", url: "assets/images/zeppelin_routes.png" },
    { name: "Monospace Return", url: "assets/images/monospace_return.png" },
    { name: "Think & Feel", url: "assets/images/think_feel.png" },
    { name: "Cloud Computing", url: "assets/images/cloud_computing.png" },
    { name: "Quantum Computing", url: "assets/images/quantum_computing.png" },
    { name: "Solar Power", url: "assets/images/solar_power.png" }
];

// Firebase Global State
let firestoreDb = null;
let isFirebaseConnected = false;
let unsubscribeFirestoreArticles = null;
let unsubscribeFirestoreSettings = null;

// Robust Firebase Config Parser (Supports pure JSON, JS objects, const firebaseConfig = { ... }, and comments)
function parseFirebaseConfig(raw) {
    if (!raw || typeof raw !== "string") return null;
    const str = raw.trim();

    // 1. Try pure JSON parse first
    try {
        const parsed = JSON.parse(str);
        if (parsed && typeof parsed === "object" && (parsed.apiKey || parsed.projectId)) {
            return parsed;
        }
    } catch (e) {}

    // 2. Extract object block { ... } if wrapped in code / variable declaration / script tag
    const firstBrace = str.indexOf('{');
    const lastBrace = str.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const objText = str.substring(firstBrace, lastBrace + 1);
        
        // Try JS Function evaluation on object literal
        try {
            const evaluated = new Function(`"use strict"; return (${objText});`)();
            if (evaluated && typeof evaluated === "object" && (evaluated.apiKey || evaluated.projectId)) {
                return evaluated;
            }
        } catch (e) {}

        // Try regex cleaning for standard JSON
        try {
            const cleaned = objText
                .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1') // remove comments
                .replace(/,\s*}/g, '}') // remove trailing commas
                .replace(/([a-zA-Z0-9_$]+)\s*:/g, '"$1":') // quote keys
                .replace(/'([^']*)'/g, '"$1"'); // replace single quotes with double quotes
            const parsedCleaned = JSON.parse(cleaned);
            if (parsedCleaned && (parsedCleaned.apiKey || parsedCleaned.projectId)) {
                return parsedCleaned;
            }
        } catch (e) {}
    }

    // 3. Fallback direct Regex extraction of known Firebase properties
    const extractField = (name) => {
        const match = str.match(new RegExp(`['"]?${name}['"]?\\s*:\\s*['"]([^'"]+)['"]`, 'i'));
        return match ? match[1].trim() : undefined;
    };

    const apiKey = extractField('apiKey');
    const authDomain = extractField('authDomain');
    const projectId = extractField('projectId');
    const storageBucket = extractField('storageBucket');
    const messagingSenderId = extractField('messagingSenderId');
    const appId = extractField('appId');
    const measurementId = extractField('measurementId');

    if (apiKey || projectId) {
        const res = {};
        if (apiKey) res.apiKey = apiKey;
        if (authDomain) res.authDomain = authDomain;
        if (projectId) res.projectId = projectId;
        if (storageBucket) res.storageBucket = storageBucket;
        if (messagingSenderId) res.messagingSenderId = messagingSenderId;
        if (appId) res.appId = appId;
        if (measurementId) res.measurementId = measurementId;
        return res;
    }

    return null;
}

// Initialize Firebase Cloud Firestore Connection
function initFirebaseCloud() {
    const rawConfig = localStorage.getItem("anr_firebase_config");
    const statusBadge = document.getElementById("cloud-status-badge");
    const configInput = document.getElementById("admin-firebase-config-input");

    if (configInput && rawConfig && !configInput.value) {
        configInput.value = rawConfig;
    }

    if (!rawConfig || typeof firebase === "undefined") {
        if (statusBadge) {
            statusBadge.innerHTML = "⚪ LOCALSTORAGE MODE";
            statusBadge.style.color = "var(--ink-black)";
        }
        return;
    }

    try {
        const config = parseFirebaseConfig(rawConfig);

        if (config && (config.apiKey || config.projectId)) {
            if (!firebase.apps || !firebase.apps.length) {
                firebase.initializeApp(config);
            }
            firestoreDb = firebase.firestore();
            isFirebaseConnected = true;

            if (statusBadge) {
                statusBadge.innerHTML = "🟢 CLOUD SYNC ACTIVE (FIRESTORE)";
                statusBadge.style.color = "#008000";
            }

            listenToCloudData();
        } else {
            throw new Error("Unable to parse valid Firebase config keys");
        }
    } catch (err) {
        console.warn("Firebase initialization skipped / format error:", err);
        if (statusBadge) {
            statusBadge.innerHTML = "⚠️ CONFIG ERROR (FALLBACK LOCAL)";
            statusBadge.style.color = "#d97706";
        }
    }
}

// Real-Time Cloud Listeners
function listenToCloudData() {
    if (!firestoreDb) return;

    // Listen to real-time dispatches
    if (unsubscribeFirestoreArticles) unsubscribeFirestoreArticles();
    unsubscribeFirestoreArticles = firestoreDb.collection("dispatches").onSnapshot(snapshot => {
        const cloudArticles = [];
        snapshot.forEach(doc => {
            cloudArticles.push(doc.data());
        });

        if (cloudArticles.length > 0) {
            localStorage.setItem("anr_custom_articles", JSON.stringify(cloudArticles));
            initCustomData();
            renderArticles();
            const postsListContainer = document.getElementById("admin-posts-list-container");
            if (postsListContainer && typeof renderAdminPostsListGlobal === "function") {
                renderAdminPostsListGlobal();
            }
        }
    }, err => {
        console.warn("Firestore realtime sync notice:", err);
    });

    // Listen to real-time editorial settings
    if (unsubscribeFirestoreSettings) unsubscribeFirestoreSettings();
    unsubscribeFirestoreSettings = firestoreDb.collection("site_meta").doc("editorial").onSnapshot(doc => {
        if (doc.exists) {
            const data = doc.data();
            localStorage.setItem("anr_editorial_settings", JSON.stringify(data));
            renderEditorialSettings();
        }
    }, err => {
        console.warn("Firestore editorial sync notice:", err);
    });
}

function initCustomData() {
    const customArticles = JSON.parse(localStorage.getItem("anr_custom_articles")) || [];
    
    // Remove any previously merged custom articles from ARTICLES_DB
    for (let i = ARTICLES_DB.length - 1; i >= 0; i--) {
        if (ARTICLES_DB[i].id.startsWith("custom-")) {
            ARTICLES_DB.splice(i, 1);
        }
    }
    
    // Merge new custom articles (place featured articles at top)
    customArticles.forEach(art => {
        if (art.featured) {
            ARTICLES_DB.unshift(art);
        } else {
            ARTICLES_DB.push(art);
        }
    });

    renderEditorialSettings();
}

// Render dynamic Masthead and Editorial info
function renderEditorialSettings() {
    const defaultSettings = {
        title: "<span class='brand-color'>ANR</span> DAILY NEWS",
        vol: "VOL. CXXIV NO. 42",
        price: "PRICE: ONE BIT",
        est: "EST. 1902",
        weather: "LONDON 14°C"
    };

    const savedSettings = JSON.parse(localStorage.getItem("anr_editorial_settings")) || defaultSettings;
    const isKm = currentLanguage === "km";

    const mastheadTitleEl = document.getElementById("masthead-title-text");
    const mastheadVolEl = document.getElementById("masthead-vol");
    const mastheadPriceEl = document.getElementById("masthead-price");
    const mastheadEstEl = document.getElementById("masthead-est");
    const weatherWidgetEl = document.getElementById("weather-widget");

    if (mastheadTitleEl && !isKm) mastheadTitleEl.innerHTML = savedSettings.title;
    if (mastheadVolEl && !isKm) mastheadVolEl.textContent = savedSettings.vol;
    if (mastheadPriceEl && !isKm) mastheadPriceEl.textContent = savedSettings.price;
    if (mastheadEstEl && !isKm) mastheadEstEl.textContent = savedSettings.est;
    if (weatherWidgetEl && !isKm && savedSettings.weather) {
        weatherWidgetEl.innerHTML = `${savedSettings.weather} <span class="weather-icon">☁</span>`;
    }
}

// Safely execute embedded <script> tags when inserting custom ad HTML
function safeInjectHTML(container, htmlCode) {
    if (!container) return;
    container.innerHTML = htmlCode;
    
    const scripts = container.querySelectorAll("script");
    scripts.forEach(oldScript => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

function renderCustomAds() {
    const leftAdContainer = document.getElementById("left-ad-container");
    const rightAdContainer = document.getElementById("right-ad-container");
    
    const savedAds = JSON.parse(localStorage.getItem("anr_custom_ads")) || { left: "", right: "" };
    const t = TRANSLATIONS[currentLanguage];

    // Left Ad
    if (leftAdContainer) {
        if (savedAds.left && savedAds.left.trim() !== "") {
            safeInjectHTML(leftAdContainer, savedAds.left);
        } else {
            leftAdContainer.innerHTML = `
                <div class="vintage-ad">
                    <div class="ad-border">
                        <p class="ad-title mono-text" id="ad-title-text">${t.adTitle}</p>
                        <p class="ad-body" id="ad-body-text">${t.adBody}</p>
                        <span class="ad-sub" id="ad-sub-text">${t.adSub}</span>
                    </div>
                </div>
            `;
        }
    }

    // Right Ad
    if (rightAdContainer) {
        if (savedAds.right && savedAds.right.trim() !== "") {
            safeInjectHTML(rightAdContainer, savedAds.right);
        } else {
            rightAdContainer.innerHTML = "";
        }
    }
}

// Translation helper using MyMemory public API
async function translateText(text, fromLang, toLang) {
    if (!text || text.trim() === "") return "";
    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.responseData && data.responseData.translatedText) {
            const decoded = document.createElement("textarea");
            decoded.innerHTML = data.responseData.translatedText;
            return decoded.value;
        }
        throw new Error("Invalid response format");
    } catch (err) {
        console.error("Translation error:", err);
        return "";
    }
}

let renderAdminPostsListGlobal = null;

// ------------------------------------------
// cPanel Main Initialization (Fully Hoisted & Fail-Safe)
// ------------------------------------------
function initAdminPanel() {
    const adminModal = document.getElementById("admin-panel-modal");
    const passcodeModal = document.getElementById("admin-passcode-modal");
    const passcodeForm = document.getElementById("admin-passcode-form");
    const passcodeInput = document.getElementById("admin-passcode-input");
    const passcodeCancel = document.getElementById("admin-passcode-cancel");
    const headerCpanelBtn = document.getElementById("cpanel-header-btn");
    const adminModalCloseBtn = document.getElementById("admin-modal-close-btn");
    const signOutBtn = document.getElementById("admin-signout-btn");
    
    const tabButtons = Array.from(document.querySelectorAll(".admin-tab-btn"));
    const tabContents = Array.from(document.querySelectorAll(".admin-tab-content"));
    
    // Tab 1: Post Form Elements
    const postForm = document.getElementById("admin-post-form");
    const postIdInput = document.getElementById("admin-post-id");
    const categorySelect = document.getElementById("admin-post-category");
    const authorInput = document.getElementById("admin-post-author");
    const imageInput = document.getElementById("admin-post-image");
    const langModeSelect = document.getElementById("admin-post-lang-mode");
    const featuredCheckbox = document.getElementById("admin-post-featured");
    
    const titleEnInput = document.getElementById("admin-post-title-en");
    const subtitleEnInput = document.getElementById("admin-post-subtitle-en");
    const previewEnInput = document.getElementById("admin-post-preview-en");
    const contentEnInput = document.getElementById("admin-post-content-en");
    
    const titleKmInput = document.getElementById("admin-post-title-km");
    const subtitleKmInput = document.getElementById("admin-post-subtitle-km");
    const previewKmInput = document.getElementById("admin-post-preview-km");
    const contentKmInput = document.getElementById("admin-post-content-km");
    
    const colEn = document.getElementById("admin-col-en");
    const colKm = document.getElementById("admin-col-km");
    const formResetBtn = document.getElementById("admin-post-clear");
    const translateBtn = document.getElementById("admin-translate-btn");
    
    // Live Preview Elements
    const previewToggleBtn = document.getElementById("admin-preview-toggle-btn");
    const previewBox = document.getElementById("admin-live-preview-box");
    const previewCloseBtn = document.getElementById("admin-preview-close-btn");
    const previewContent = document.getElementById("admin-live-preview-content");
    
    // Archive List & Filters
    const postsListContainer = document.getElementById("admin-posts-list-container");
    const postsCountBadge = document.getElementById("admin-posts-count");
    const archiveSearchInput = document.getElementById("admin-archive-search");
    const filterPills = document.querySelectorAll(".filter-pill");
    let activeArchiveCategory = "all";
    
    // Tab 2: Editorial & Ticker Elements
    const editorialForm = document.getElementById("admin-editorial-form");
    const mastheadTitleInput = document.getElementById("admin-masthead-title");
    const mastheadVolInput = document.getElementById("admin-masthead-vol");
    const mastheadPriceInput = document.getElementById("admin-masthead-price");
    const mastheadEstInput = document.getElementById("admin-masthead-est");
    const weatherCityInputSettings = document.getElementById("admin-weather-city");
    const editorialResetBtn = document.getElementById("admin-editorial-reset");
    
    const newBulletinInput = document.getElementById("admin-new-bulletin-input");
    const addBulletinBtn = document.getElementById("admin-add-bulletin-btn");
    const bulletinsManageList = document.getElementById("admin-bulletins-list");
    
    // Tab 3: Ads Elements
    const adsForm = document.getElementById("admin-ads-form");
    const leftAdTextarea = document.getElementById("admin-ad-left");
    const rightAdTextarea = document.getElementById("admin-ad-right");
    const clearAdsBtn = document.getElementById("admin-ads-clear-btn");
    
    // Tab 4: Media Elements
    const mediaPresetGrid = document.getElementById("admin-media-preset-grid");
    const mediaTestUrlInput = document.getElementById("admin-media-test-url");
    const mediaTestBtn = document.getElementById("admin-media-test-btn");
    const mediaUseBtn = document.getElementById("admin-media-use-btn");
    const mediaTestPreview = document.getElementById("admin-media-test-preview");
    const mediaPreviewImg = document.getElementById("admin-media-preview-img");
    
    // Tab 5: Security, Firebase & Backup Elements
    const passcodeChangeForm = document.getElementById("admin-passcode-change-form");
    const currentPasscodeInput = document.getElementById("admin-current-passcode");
    const newPasscodeInput = document.getElementById("admin-new-passcode");
    const confirmPasscodeInput = document.getElementById("admin-confirm-passcode");
    
    const firebaseConfigInput = document.getElementById("admin-firebase-config-input");
    const firebaseSaveBtn = document.getElementById("admin-firebase-save-btn");
    const firebasePushBtn = document.getElementById("admin-firebase-push-btn");
    const firebaseDisconnectBtn = document.getElementById("admin-firebase-disconnect-btn");
    
    const backupTextarea = document.getElementById("admin-backup-data");
    const backupBtn = document.getElementById("admin-backup-btn");
    const restoreBtn = document.getElementById("admin-restore-btn");
    const factoryResetBtn = document.getElementById("admin-factory-reset-btn");

    if (!adminModal || !passcodeModal) return;

    // Helper: Passcode
    function getMasterPasscode() {
        return localStorage.getItem("anr_admin_passcode") || "ANRNews2026";
    }

    // Modal Control Functions
    function triggerAdminAccess() {
        if (sessionStorage.getItem("anr_admin_authorized") === "true") {
            openAdminPanel();
        } else {
            if (passcodeModal) {
                passcodeModal.classList.add("active");
                passcodeModal.setAttribute("aria-hidden", "false");
                if (passcodeInput) {
                    passcodeInput.value = "";
                    passcodeInput.focus();
                }
            }
        }
    }

    function openAdminPanel() {
        if (passcodeModal) {
            passcodeModal.classList.remove("active");
            passcodeModal.setAttribute("aria-hidden", "true");
        }
        if (adminModal) {
            adminModal.classList.add("active");
            adminModal.setAttribute("aria-hidden", "false");
        }
        try { renderAdminPostsList(); } catch(e) { console.error("renderAdminPostsList error:", e); }
        try { loadEditorialInputs(); } catch(e) { console.error("loadEditorialInputs error:", e); }
        try { renderBulletinsManager(); } catch(e) { console.error("renderBulletinsManager error:", e); }
        try { loadAdsInputs(); } catch(e) { console.error("loadAdsInputs error:", e); }
        try { renderMediaPresets(); } catch(e) { console.error("renderMediaPresets error:", e); }
        try { initFirebaseCloud(); } catch(e) { console.error("initFirebaseCloud error:", e); }
    }

    function closeAdminPanel() {
        if (adminModal) {
            adminModal.classList.remove("active");
            adminModal.setAttribute("aria-hidden", "true");
        }
    }

    function signOutAdminPanel() {
        closeAdminPanel();
        sessionStorage.removeItem("anr_admin_authorized");
        showToast("SIGNED OUT OF CPANEL");
    }

    // Expose globally for direct fail-safe HTML calls
    window.closeAdminPanel = closeAdminPanel;
    window.signOutAdminPanel = signOutAdminPanel;
    window.triggerAdminAccess = triggerAdminAccess;

    // W3C Accessible Tab Switcher
    function switchTab(targetTabId) {
        tabButtons.forEach(btn => {
            const isTarget = btn.getAttribute("data-tab") === targetTabId;
            btn.classList.toggle("active", isTarget);
            btn.setAttribute("aria-selected", isTarget ? "true" : "false");
            btn.setAttribute("tabindex", isTarget ? "0" : "-1");
        });

        tabContents.forEach(content => {
            const isTarget = content.id === targetTabId;
            content.classList.toggle("active", isTarget);
        });

        if (targetTabId === "tab-backup") {
            exportBackupToTextarea();
        }
    }

    // ------------------------------------------
    // 1. Triggers & Bindings
    // ------------------------------------------
    if (headerCpanelBtn) {
        headerCpanelBtn.onclick = () => triggerAdminAccess();
    }
    if (adminModalCloseBtn) {
        adminModalCloseBtn.onclick = () => closeAdminPanel();
    }
    if (signOutBtn) {
        signOutBtn.onclick = () => signOutAdminPanel();
    }

    // Backdrop Click handlers
    adminModal.addEventListener("click", (e) => {
        if (e.target === adminModal) closeAdminPanel();
    });
    passcodeModal.addEventListener("click", (e) => {
        if (e.target === passcodeModal) {
            passcodeModal.classList.remove("active");
            passcodeModal.setAttribute("aria-hidden", "true");
        }
    });

    // Keyboard Shortcuts & Secret Types
    let typedBuffer = "";
    document.addEventListener("keydown", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") {
            return;
        }

        typedBuffer += e.key.toLowerCase();
        if (typedBuffer.length > 20) {
            typedBuffer = typedBuffer.substring(typedBuffer.length - 10);
        }

        const isSecretTyped = typedBuffer.endsWith("cpanel") || typedBuffer.endsWith("admin");
        const isComboPressed = e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a";

        if (isSecretTyped || isComboPressed) {
            typedBuffer = "";
            e.preventDefault();
            triggerAdminAccess();
        }

        if (e.key === "Escape") {
            if (passcodeModal && passcodeModal.classList.contains("active")) {
                passcodeModal.classList.remove("active");
                passcodeModal.setAttribute("aria-hidden", "true");
            }
            if (adminModal && adminModal.classList.contains("active")) {
                closeAdminPanel();
            }
        }
    });

    const checkUrlHashAccess = () => {
        if (window.location.hash === "#cpanel" || window.location.hash === "#admin") {
            history.replaceState(null, null, " ");
            triggerAdminAccess();
        }
    };
    window.addEventListener("hashchange", checkUrlHashAccess);
    checkUrlHashAccess();

    // Passcode Form Submit
    if (passcodeForm) {
        passcodeForm.onsubmit = (e) => {
            e.preventDefault();
            if (passcodeInput && passcodeInput.value === getMasterPasscode()) {
                sessionStorage.setItem("anr_admin_authorized", "true");
                openAdminPanel();
                showToast("AUTHORIZATION CONFIRMED");
            } else {
                showToast("AUTHORIZATION DENIED: INVALID KEY");
                if (passcodeInput) {
                    passcodeInput.value = "";
                    passcodeInput.focus();
                }
            }
        };
    }

    if (passcodeCancel) {
        passcodeCancel.onclick = () => {
            passcodeModal.classList.remove("active");
            passcodeModal.setAttribute("aria-hidden", "true");
            if (passcodeInput) passcodeInput.value = "";
        };
    }

    // Tab Buttons Event Listeners
    tabButtons.forEach((btn, index) => {
        btn.onclick = () => switchTab(btn.getAttribute("data-tab"));

        btn.onkeydown = (e) => {
            let nextIndex = null;
            if (e.key === "ArrowRight") {
                nextIndex = (index + 1) % tabButtons.length;
            } else if (e.key === "ArrowLeft") {
                nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
            }

            if (nextIndex !== null) {
                e.preventDefault();
                tabButtons[nextIndex].focus();
                switchTab(tabButtons[nextIndex].getAttribute("data-tab"));
            }
        };
    });

    // ------------------------------------------
    // 2. Tab 1: Post Editor & Live Preview
    // ------------------------------------------
    function updateLivePreview() {
        if (!previewContent) return;
        const mode = langModeSelect ? langModeSelect.value : "bilingual";
        const isKm = (mode === "km");
        const title = isKm ? (titleKmInput ? titleKmInput.value : "") : (titleEnInput ? titleEnInput.value : "");
        const sub = isKm ? (subtitleKmInput ? subtitleKmInput.value : "") : (subtitleEnInput ? subtitleEnInput.value : "");
        const content = isKm ? (contentKmInput ? contentKmInput.value : "") : (contentEnInput ? contentEnInput.value : "");
        const author = authorInput ? (authorInput.value.toUpperCase() || "STAFF") : "STAFF";
        const cat = categorySelect ? categorySelect.value.toUpperCase() : "NEWS";

        previewContent.innerHTML = `
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--ink-grey); margin-bottom: 0.3rem;">
                ${cat} &bull; BY ${author} &bull; [PREVIEW]
            </div>
            <h3 style="font-family: var(--font-heading); font-size: 1.25rem; line-height: 1.2; margin-bottom: 0.3rem;">
                ${title || "Headline Will Appear Here"}
            </h3>
            ${sub ? `<p style="font-style: italic; font-size: 0.9rem; opacity: 0.8; margin-bottom: 0.5rem;">${sub}</p>` : ""}
            <div style="font-size: 0.88rem; line-height: 1.5;">
                ${content || "<p style='opacity:0.6;'>Article body content...</p>"}
            </div>
        `;
    }

    let lastActiveTextarea = contentEnInput;
    [titleEnInput, subtitleEnInput, previewEnInput, contentEnInput, titleKmInput, subtitleKmInput, previewKmInput, contentKmInput].forEach(field => {
        if (field) {
            field.addEventListener("focus", () => {
                if (field.tagName === "TEXTAREA") lastActiveTextarea = field;
            });
            field.addEventListener("input", () => {
                if (previewBox && previewBox.style.display !== "none") updateLivePreview();
            });
        }
    });

    const toolbarButtons = document.querySelectorAll(".editor-toolbar .toolbar-btn");
    toolbarButtons.forEach(btn => {
        btn.onclick = () => {
            const tag = btn.getAttribute("data-tag");
            const textarea = lastActiveTextarea || contentEnInput;
            if (!textarea) return;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selectedText = textarea.value.substring(start, end);
            let insertion = "";

            switch (tag) {
                case "bold":
                    insertion = `<b>${selectedText || "Bold Text"}</b>`;
                    break;
                case "italic":
                    insertion = `<i>${selectedText || "Italic Text"}</i>`;
                    break;
                case "dropcap":
                    insertion = `<span class="dropcap">${selectedText || "T"}</span>`;
                    break;
                case "quote":
                    insertion = `<blockquote>${selectedText || "Quoted dispatch text..."}</blockquote>`;
                    break;
                case "p":
                    insertion = `<p>${selectedText || "New paragraph..."}</p>`;
                    break;
                case "h3":
                    insertion = `<h3>${selectedText || "Section Heading"}</h3>`;
                    break;
                default:
                    insertion = selectedText;
            }

            textarea.setRangeText(insertion, start, end, "select");
            textarea.focus();
            if (previewBox && previewBox.style.display !== "none") updateLivePreview();
        };
    });

    if (previewToggleBtn && previewBox) {
        previewToggleBtn.onclick = () => {
            const isHidden = previewBox.style.display === "none";
            previewBox.style.display = isHidden ? "block" : "none";
            if (isHidden) {
                updateLivePreview();
                previewToggleBtn.textContent = "🙈 HIDE PREVIEW";
            } else {
                previewToggleBtn.textContent = "👁️ LIVE PREVIEW";
            }
        };
    }

    if (previewCloseBtn && previewBox) {
        previewCloseBtn.onclick = () => {
            previewBox.style.display = "none";
            if (previewToggleBtn) previewToggleBtn.textContent = "👁️ LIVE PREVIEW";
        };
    }

    function applyLangMode(mode) {
        if (!colEn || !colKm) return;
        if (mode === "km") {
            colKm.style.display = "";
            colEn.style.display = "none";
        } else if (mode === "en") {
            colEn.style.display = "";
            colKm.style.display = "none";
        } else {
            colEn.style.display = "";
            colKm.style.display = "";
        }
    }

    if (langModeSelect) {
        langModeSelect.onchange = () => applyLangMode(langModeSelect.value);
        applyLangMode(langModeSelect.value);
    }

    if (formResetBtn && postForm) {
        formResetBtn.onclick = () => {
            postForm.reset();
            if (postIdInput) postIdInput.value = "";
            if (langModeSelect) {
                langModeSelect.value = "bilingual";
                applyLangMode("bilingual");
            }
            if (featuredCheckbox) featuredCheckbox.checked = false;
            if (previewBox && previewBox.style.display !== "none") updateLivePreview();
        };
    }

    if (translateBtn) {
        translateBtn.onclick = async () => {
            const mode = langModeSelect ? langModeSelect.value : "bilingual";
            const srcLang = (mode === "en") ? "en" : "km";
            const tgtLang = (mode === "en") ? "km" : "en";
            const srcTitleInput = (mode === "en") ? titleEnInput : titleKmInput;
            const srcSubtitleInput = (mode === "en") ? subtitleEnInput : subtitleKmInput;
            const srcPreviewInput = (mode === "en") ? previewEnInput : previewKmInput;
            const srcContentInput = (mode === "en") ? contentEnInput : contentKmInput;
            const tgtTitleInput = (mode === "en") ? titleKmInput : titleEnInput;
            const tgtSubtitleInput = (mode === "en") ? subtitleKmInput : subtitleEnInput;
            const tgtPreviewInput = (mode === "en") ? previewKmInput : previewEnInput;
            const tgtContentInput = (mode === "en") ? contentKmInput : contentEnInput;

            const titleSrc = srcTitleInput ? srcTitleInput.value.trim() : "";
            const subtitleSrc = srcSubtitleInput ? srcSubtitleInput.value.trim() : "";
            const previewSrc = srcPreviewInput ? srcPreviewInput.value.trim() : "";
            const contentSrc = srcContentInput ? srcContentInput.value.trim() : "";

            if (!titleSrc && !previewSrc && !contentSrc) {
                alert("Please enter some text in the source language fields first.");
                return;
            }

            const origText = translateBtn.textContent;
            translateBtn.textContent = "TRANSLATING...";
            translateBtn.disabled = true;

            try {
                const [titleTrans, subtitleTrans, previewTrans, contentTrans] = await Promise.all([
                    translateText(titleSrc, srcLang, tgtLang),
                    translateText(subtitleSrc, srcLang, tgtLang),
                    translateText(previewSrc, srcLang, tgtLang),
                    translateText(contentSrc, srcLang, tgtLang)
                ]);

                if (titleTrans && tgtTitleInput) tgtTitleInput.value = titleTrans;
                if (subtitleTrans && tgtSubtitleInput) tgtSubtitleInput.value = subtitleTrans;
                if (previewTrans && tgtPreviewInput) tgtPreviewInput.value = previewTrans;
                if (contentTrans && tgtContentInput) tgtContentInput.value = contentTrans;

                showToast("AUTO-TRANSLATION COMPLETE");
                if (previewBox && previewBox.style.display !== "none") updateLivePreview();
            } catch (err) {
                console.error("Auto-translation failed:", err);
                alert("Translation lookup failed. Please verify your connection and try again.");
            } finally {
                translateBtn.textContent = origText;
                translateBtn.disabled = false;
            }
        };
    }

    // ------------------------------------------
    // 3. Tab 1: Archived Dispatches List
    // ------------------------------------------
    function renderAdminPostsList() {
        if (!postsListContainer) return;
        postsListContainer.innerHTML = "";
        
        const searchQueryVal = archiveSearchInput ? archiveSearchInput.value.toLowerCase().trim() : "";
        
        let filteredArticles = ARTICLES_DB.filter(art => {
            const matchesCat = (activeArchiveCategory === "all") || (art.category === activeArchiveCategory);
            if (!matchesCat) return false;

            if (!searchQueryVal) return true;
            const titleEn = art.en ? art.en.title.toLowerCase() : "";
            const titleKm = art.km ? art.km.title.toLowerCase() : "";
            const author = art.author ? art.author.toLowerCase() : "";
            return titleEn.includes(searchQueryVal) || titleKm.includes(searchQueryVal) || author.includes(searchQueryVal);
        });

        if (postsCountBadge) {
            postsCountBadge.textContent = `${filteredArticles.length} DISPATCHES`;
        }

        if (filteredArticles.length === 0) {
            postsListContainer.innerHTML = `<p class="mono-text text-sm" style="opacity:0.6; padding:0.5rem;">No dispatches match your search filters.</p>`;
            return;
        }

        filteredArticles.forEach(art => {
            const isCustom = art.id && art.id.startsWith("custom-");
            const metaStr = `${art.category.toUpperCase()} &bull; BY ${art.author}`;
            const contentLang = (currentLanguage && art[currentLanguage]) ? art[currentLanguage] : (art.en || art.km || {});
            const isFeatured = art.featured ? '<span style="color:#d4af37;">★ LEAD</span>' : '';
            
            const item = document.createElement("div");
            item.className = "admin-post-item";
            item.innerHTML = `
                <div class="admin-post-item-info">
                    <h4 class="admin-post-item-title">${contentLang.title || "Untitled Dispatch"}</h4>
                    <span class="admin-post-item-meta">${metaStr} ${isCustom ? '<span style="color:#0056b3;">[USER]</span>' : '[SYSTEM]'} ${isFeatured}</span>
                </div>
                <div class="admin-post-item-actions">
                    <button class="admin-action-link edit" title="Edit Article">[EDIT]</button>
                    ${isCustom ? '<button class="admin-action-link delete" title="Delete Article">[DEL]</button>' : ''}
                </div>
            `;
            
            item.querySelector(".edit").onclick = () => {
                if (postIdInput) postIdInput.value = art.id;
                if (categorySelect) categorySelect.value = art.category;
                if (authorInput) authorInput.value = art.author;
                if (imageInput) imageInput.value = art.image || "";
                if (featuredCheckbox) featuredCheckbox.checked = !!art.featured;
                
                if (titleEnInput) titleEnInput.value = art.en ? art.en.title : "";
                if (subtitleEnInput) subtitleEnInput.value = art.en ? (art.en.subTitle || "") : "";
                if (previewEnInput) previewEnInput.value = art.en ? art.en.preview : "";
                if (contentEnInput) contentEnInput.value = art.en ? art.en.content : "";
                
                if (titleKmInput) titleKmInput.value = art.km ? art.km.title : "";
                if (subtitleKmInput) subtitleKmInput.value = art.km ? (art.km.subTitle || "") : "";
                if (previewKmInput) previewKmInput.value = art.km ? art.km.preview : "";
                if (contentKmInput) contentKmInput.value = art.km ? art.km.content : "";

                if (postForm) postForm.scrollTop = 0;
                showToast("ARTICLE LOADED TO EDITOR");
                if (previewBox && previewBox.style.display !== "none") updateLivePreview();
            };
            
            if (isCustom) {
                item.querySelector(".delete").onclick = () => {
                    if (confirm(`Are you sure you want to delete dispatch "${contentLang.title || 'this article'}"?`)) {
                        deleteCustomArticle(art.id);
                    }
                };
            }
            
            postsListContainer.appendChild(item);
        });
    }

    renderAdminPostsListGlobal = renderAdminPostsList;

    if (archiveSearchInput) {
        archiveSearchInput.oninput = renderAdminPostsList;
    }

    filterPills.forEach(pill => {
        pill.onclick = () => {
            filterPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            activeArchiveCategory = pill.getAttribute("data-filter");
            renderAdminPostsList();
        };
    });

    function deleteCustomArticle(id) {
        let customArticles = JSON.parse(localStorage.getItem("anr_custom_articles")) || [];
        customArticles = customArticles.filter(art => art.id !== id);
        localStorage.setItem("anr_custom_articles", JSON.stringify(customArticles));
        
        if (isFirebaseConnected && firestoreDb) {
            firestoreDb.collection("dispatches").doc(id).delete().catch(err => console.error("Cloud delete error:", err));
        }

        initCustomData();
        renderArticles();
        renderAdminPostsList();
        showToast("ARTICLE DELETED");
    }

    // Save/Publish Article Form
    if (postForm) {
        postForm.onsubmit = (e) => {
            e.preventDefault();
            
            const existingId = postIdInput ? postIdInput.value : "";
            const id = existingId || "custom-" + Date.now();
            const category = categorySelect ? categorySelect.value : "technology";
            const author = authorInput ? authorInput.value.trim().toUpperCase() : "EDITORIAL DESK";
            const image = imageInput ? imageInput.value.trim() : "";
            const mode = langModeSelect ? langModeSelect.value : "bilingual";
            const isFeatured = featuredCheckbox ? featuredCheckbox.checked : false;
            
            if (mode === "km" && titleKmInput && titleEnInput) {
                titleEnInput.value = titleKmInput.value;
                if (subtitleEnInput && subtitleKmInput) subtitleEnInput.value = subtitleKmInput.value;
                if (previewEnInput && previewKmInput) previewEnInput.value = previewKmInput.value;
                if (contentEnInput && contentKmInput) contentEnInput.value = contentKmInput.value;
            } else if (mode === "en" && titleEnInput && titleKmInput) {
                titleKmInput.value = titleEnInput.value;
                if (subtitleKmInput && subtitleEnInput) subtitleKmInput.value = subtitleEnInput.value;
                if (previewKmInput && previewEnInput) previewKmInput.value = previewEnInput.value;
                if (contentKmInput && contentEnInput) contentKmInput.value = contentEnInput.value;
            }

            const cleanContentEn = contentEnInput ? contentEnInput.value.replace(/<[^>]*>/g, "") : "";
            const wordCountVal = cleanContentEn.split(/\s+/).filter(Boolean).length;
            const readTimeVal = Math.max(1, Math.round(wordCountVal / 200));

            const newArticle = {
                id,
                category,
                author,
                featured: isFeatured,
                date: new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }).toUpperCase(),
                dateKm: new Date().toLocaleDateString("km-KH", { month: "long", day: "2-digit", year: "numeric" }),
                wordCount: `${wordCountVal} WORDS`,
                wordCountKm: `${wordCountVal} ពាក្យ`,
                readTime: `${readTimeVal} MIN READ`,
                readTimeKm: `${readTimeVal} នាទីអាន`,
                image: image || null,
                en: {
                    title: titleEnInput ? titleEnInput.value.trim() : "",
                    subTitle: subtitleEnInput ? subtitleEnInput.value.trim() : "",
                    preview: previewEnInput ? previewEnInput.value.trim() : "",
                    content: contentEnInput ? contentEnInput.value.trim() : ""
                },
                km: {
                    title: titleKmInput ? titleKmInput.value.trim() : "",
                    subTitle: subtitleKmInput ? subtitleKmInput.value.trim() : "",
                    preview: previewKmInput ? previewKmInput.value.trim() : "",
                    content: contentKmInput ? contentKmInput.value.trim() : ""
                }
            };

            let customArticles = JSON.parse(localStorage.getItem("anr_custom_articles")) || [];
            const existingIdx = customArticles.findIndex(art => art.id === id);
            
            if (existingIdx !== -1) {
                customArticles[existingIdx] = newArticle;
                showToast("ARTICLE MODIFICATIONS SAVED");
            } else if (id.startsWith("custom-")) {
                customArticles.push(newArticle);
                showToast("NEW DISPATCH ENGRAVED & PUBLISHED");
            } else {
                customArticles.push(newArticle);
                showToast("ARTICLE OVERRIDE SAVED");
            }

            localStorage.setItem("anr_custom_articles", JSON.stringify(customArticles));
            
            if (isFirebaseConnected && firestoreDb) {
                firestoreDb.collection("dispatches").doc(id).set(newArticle)
                    .then(() => showToast("DISPATCH SYNCED TO FIREBASE CLOUD"))
                    .catch(err => console.error("Firebase save error:", err));
            }

            initCustomData();
            renderArticles();
            renderAdminPostsList();
            
            postForm.reset();
            if (postIdInput) postIdInput.value = "";
            if (featuredCheckbox) featuredCheckbox.checked = false;
            if (previewBox && previewBox.style.display !== "none") updateLivePreview();
        };
    }

    // ------------------------------------------
    // 4. Tab 2: Editorial & Ticker Settings
    // ------------------------------------------
    function loadEditorialInputs() {
        const savedSettings = JSON.parse(localStorage.getItem("anr_editorial_settings")) || {
            title: "ANR DAILY NEWS",
            vol: "VOL. CXXIV NO. 42",
            price: "PRICE: ONE BIT",
            est: "EST. 1902",
            weather: "LONDON 14°C"
        };

        if (mastheadTitleInput) mastheadTitleInput.value = savedSettings.title ? savedSettings.title.replace(/<[^>]*>/g, "") : "";
        if (mastheadVolInput) mastheadVolInput.value = savedSettings.vol || "";
        if (mastheadPriceInput) mastheadPriceInput.value = savedSettings.price || "";
        if (mastheadEstInput) mastheadEstInput.value = savedSettings.est || "";
        if (weatherCityInputSettings) weatherCityInputSettings.value = savedSettings.weather || "";
    }

    if (editorialForm) {
        editorialForm.onsubmit = (e) => {
            e.preventDefault();
            const config = {
                title: `<span class='brand-color'>ANR</span> ${(mastheadTitleInput ? mastheadTitleInput.value : "").replace("ANR", "").trim()}`,
                vol: mastheadVolInput ? mastheadVolInput.value.trim() : "",
                price: mastheadPriceInput ? mastheadPriceInput.value.trim() : "",
                est: mastheadEstInput ? mastheadEstInput.value.trim() : "",
                weather: weatherCityInputSettings ? weatherCityInputSettings.value.trim() : ""
            };
            localStorage.setItem("anr_editorial_settings", JSON.stringify(config));
            
            if (isFirebaseConnected && firestoreDb) {
                firestoreDb.collection("site_meta").doc("editorial").set(config)
                    .catch(err => console.error("Firebase editorial sync error:", err));
            }

            renderEditorialSettings();
            showToast("EDITORIAL SETTINGS SAVED");
        };
    }

    if (editorialResetBtn) {
        editorialResetBtn.onclick = () => {
            localStorage.removeItem("anr_editorial_settings");
            loadEditorialInputs();
            renderEditorialSettings();
            showToast("EDITORIAL SETTINGS RESTORED TO DEFAULT");
        };
    }

    function getStoredBulletins() {
        const stored = JSON.parse(localStorage.getItem("anr_ticker_bulletins"));
        return Array.isArray(stored) && stored.length > 0 ? stored : (typeof TICKER_ITEMS_EN !== "undefined" ? TICKER_ITEMS_EN : []);
    }

    function renderBulletinsManager() {
        if (!bulletinsManageList) return;
        bulletinsManageList.innerHTML = "";
        const bulletins = getStoredBulletins();

        bulletins.forEach((itemText, index) => {
            const row = document.createElement("div");
            row.className = "bulletin-manage-item mono-text text-sm";
            row.innerHTML = `
                <span style="flex:1; overflow:hidden; text-overflow:ellipsis;">• ${itemText}</span>
                <button type="button" class="admin-action-link delete" style="padding:0.2rem 0.4rem;">[REMOVE]</button>
            `;
            row.querySelector(".delete").onclick = () => {
                const updated = bulletins.filter((_, i) => i !== index);
                localStorage.setItem("anr_ticker_bulletins", JSON.stringify(updated));
                renderBulletinsManager();
                syncLiveTicker();
                showToast("BULLETIN REMOVED");
            };
            bulletinsManageList.appendChild(row);
        });
    }

    function syncLiveTicker() {
        const bulletins = getStoredBulletins();
        if (tickerContent && bulletins.length > 0) {
            tickerContent.innerHTML = bulletins.join(" &nbsp;&bull;&nbsp; ") + " &nbsp;&bull;&nbsp; " + bulletins.join(" &nbsp;&bull;&nbsp; ");
        }
    }

    if (addBulletinBtn && newBulletinInput) {
        addBulletinBtn.onclick = () => {
            const val = newBulletinInput.value.trim();
            if (!val) return;
            const bulletins = getStoredBulletins();
            bulletins.push(val);
            localStorage.setItem("anr_ticker_bulletins", JSON.stringify(bulletins));
            newBulletinInput.value = "";
            renderBulletinsManager();
            syncLiveTicker();
            showToast("NEW BULLETIN ADDED TO TICKER");
        };
    }

    // ------------------------------------------
    // 5. Tab 3: Ads Management
    // ------------------------------------------
    function loadAdsInputs() {
        const savedAds = JSON.parse(localStorage.getItem("anr_custom_ads")) || { left: "", right: "" };
        if (leftAdTextarea) leftAdTextarea.value = savedAds.left || "";
        if (rightAdTextarea) rightAdTextarea.value = savedAds.right || "";
    }

    if (adsForm) {
        adsForm.onsubmit = (e) => {
            e.preventDefault();
            const config = {
                left: leftAdTextarea ? leftAdTextarea.value : "",
                right: rightAdTextarea ? rightAdTextarea.value : ""
            };
            localStorage.setItem("anr_custom_ads", JSON.stringify(config));
            renderCustomAds();
            showToast("ADVERTISING BLOCKS UPDATED");
        };
    }

    if (clearAdsBtn) {
        clearAdsBtn.onclick = () => {
            localStorage.removeItem("anr_custom_ads");
            loadAdsInputs();
            renderCustomAds();
            showToast("VINTAGE ILLUSTRATED ADS RESTORED");
        };
    }

    // ------------------------------------------
    // 6. Tab 4: Media & Assets Gallery
    // ------------------------------------------
    function renderMediaPresets() {
        if (!mediaPresetGrid || typeof PRESET_MEDIA_ASSETS === "undefined") return;
        mediaPresetGrid.innerHTML = "";

        PRESET_MEDIA_ASSETS.forEach(asset => {
            const card = document.createElement("div");
            card.className = "media-card";
            card.innerHTML = `
                <div class="media-card-img">
                    <img src="${asset.url}" alt="${asset.name}" loading="lazy">
                </div>
                <div class="media-card-title">${asset.name}</div>
                <div class="media-card-actions">
                    <button type="button" class="use-btn" title="Use as cover image in post form">USE AS COVER</button>
                    <button type="button" class="copy-btn" title="Copy URL">COPY URL</button>
                </div>
            `;

            card.querySelector(".use-btn").onclick = () => {
                if (imageInput) imageInput.value = asset.url;
                switchTab("tab-posts");
                if (previewBox && previewBox.style.display !== "none") updateLivePreview();
                showToast(`IMAGE APPLIED: ${asset.name}`);
            };

            card.querySelector(".copy-btn").onclick = () => {
                navigator.clipboard.writeText(asset.url).then(() => {
                    showToast("IMAGE URL COPIED");
                }).catch(() => {
                    showToast(`URL: ${asset.url}`);
                });
            };

            mediaPresetGrid.appendChild(card);
        });
    }

    if (mediaTestBtn && mediaTestUrlInput) {
        mediaTestBtn.onclick = () => {
            const url = mediaTestUrlInput.value.trim();
            if (!url) return;
            if (mediaPreviewImg) mediaPreviewImg.src = url;
            if (mediaTestPreview) mediaTestPreview.style.display = "block";
        };
    }

    if (mediaUseBtn && mediaTestUrlInput) {
        mediaUseBtn.onclick = () => {
            const url = mediaTestUrlInput.value.trim();
            if (!url) return;
            if (imageInput) imageInput.value = url;
            switchTab("tab-posts");
            if (previewBox && previewBox.style.display !== "none") updateLivePreview();
            showToast("CUSTOM IMAGE URL APPLIED TO DISPATCH");
        };
    }

    // ------------------------------------------
    // 7. Tab 5: Security Passcode, Firebase & Backup
    // ------------------------------------------
    if (passcodeChangeForm) {
        passcodeChangeForm.onsubmit = (e) => {
            e.preventDefault();
            const currentPass = currentPasscodeInput ? currentPasscodeInput.value : "";
            const newPass = newPasscodeInput ? newPasscodeInput.value : "";
            const confirmPass = confirmPasscodeInput ? confirmPasscodeInput.value : "";

            if (currentPass !== getMasterPasscode()) {
                alert("Current passcode is incorrect.");
                return;
            }

            if (newPass.length < 4) {
                alert("New passcode must be at least 4 characters long.");
                return;
            }

            if (newPass !== confirmPass) {
                alert("New passcodes do not match.");
                return;
            }

            localStorage.setItem("anr_admin_passcode", newPass);
            if (currentPasscodeInput) currentPasscodeInput.value = "";
            if (newPasscodeInput) newPasscodeInput.value = "";
            if (confirmPasscodeInput) confirmPasscodeInput.value = "";
            showToast("MASTER TELEGRAPH PASSCODE UPDATED");
        };
    }

    if (firebaseSaveBtn && firebaseConfigInput) {
        firebaseSaveBtn.onclick = () => {
            const val = firebaseConfigInput.value.trim();
            if (!val) {
                alert("Please paste your firebaseConfig snippet from the Firebase Console.");
                return;
            }
            localStorage.setItem("anr_firebase_config", val);
            initFirebaseCloud();
            if (isFirebaseConnected) {
                showToast("🔥 FIREBASE CLOUD CONNECTED SUCCESSFULLY!");
            } else {
                alert("Could not read valid Firebase keys. Please ensure you copied the entire const firebaseConfig = { ... } object from Project Settings > Your Apps.");
            }
        };
    }

    if (firebaseDisconnectBtn) {
        firebaseDisconnectBtn.onclick = () => {
            localStorage.removeItem("anr_firebase_config");
            isFirebaseConnected = false;
            firestoreDb = null;
            if (unsubscribeFirestoreArticles) unsubscribeFirestoreArticles();
            if (unsubscribeFirestoreSettings) unsubscribeFirestoreSettings();
            
            const statusBadge = document.getElementById("cloud-status-badge");
            if (statusBadge) {
                statusBadge.innerHTML = "⚪ LOCALSTORAGE MODE";
                statusBadge.style.color = "var(--ink-black)";
            }
            if (firebaseConfigInput) firebaseConfigInput.value = "";
            showToast("DISCONNECTED FROM FIREBASE CLOUD");
        };
    }

    if (firebasePushBtn) {
        firebasePushBtn.onclick = async () => {
            if (!isFirebaseConnected || !firestoreDb) {
                alert("Please connect Firebase first before pushing data.");
                return;
            }

            try {
                const customArticles = JSON.parse(localStorage.getItem("anr_custom_articles")) || [];
                const allArticlesMap = new Map();
                ARTICLES_DB.forEach(art => allArticlesMap.set(art.id, art));
                customArticles.forEach(art => allArticlesMap.set(art.id, art));
                const allArticles = Array.from(allArticlesMap.values());

                const batch = firestoreDb.batch();
                allArticles.forEach(art => {
                    const docRef = firestoreDb.collection("dispatches").doc(art.id);
                    batch.set(docRef, art, { merge: true });
                });
                await batch.commit();

                const editorialSettings = JSON.parse(localStorage.getItem("anr_editorial_settings")) || {
                    mastheadTitle: "ANR DAILY NEWS",
                    volNo: "VOL. CXXIV NO. 42",
                    price: "PRICE: ONE BIT",
                    est: "EST. 1902"
                };
                const tickerBulletins = JSON.parse(localStorage.getItem("anr_ticker_bulletins")) || [
                    "STOCK TICKER REPLACED BY NEURAL INTENT PRICING ACROSS CONTINENTS.",
                    "NEW ZEPPELIN ROUTE ESTABLISHED BETWEEN FRANKFURT AND TOKYO.",
                    "OFFLINE-FIRST WEB ARCHITECTURES SURPASS CLOUD PLATFORMS IN USER RETENTION."
                ];

                await firestoreDb.collection("editorial_settings").doc("masthead").set({
                    ...editorialSettings,
                    tickerBulletins,
                    updatedAt: Date.now()
                }, { merge: true });

                showToast(`🔥 SUCCESS: ${allArticles.length} ARTICLES & EDITORIAL SETTINGS PUSHED TO CLOUD!`);
            } catch (err) {
                console.error("Cloud push failed:", err);
                alert("Failed to push data to Firebase: " + err.message);
            }
        };
    }

    function exportBackupToTextarea() {
        const customArticles = JSON.parse(localStorage.getItem("anr_custom_articles")) || [];
        const customAds = JSON.parse(localStorage.getItem("anr_custom_ads")) || { left: "", right: "" };
        const editorialSettings = JSON.parse(localStorage.getItem("anr_editorial_settings")) || null;
        const tickerBulletins = JSON.parse(localStorage.getItem("anr_ticker_bulletins")) || null;
        
        const backupObj = {
            version: "2.0",
            timestamp: Date.now(),
            customArticles,
            customAds,
            editorialSettings,
            tickerBulletins
        };
        
        if (backupTextarea) {
            backupTextarea.value = JSON.stringify(backupObj, null, 2);
        }
    }

    if (backupBtn) {
        backupBtn.onclick = () => {
            exportBackupToTextarea();
            if (backupTextarea) {
                backupTextarea.select();
                navigator.clipboard.writeText(backupTextarea.value).then(() => {
                    showToast("SNAPSHOT COPIED TO CLIPBOARD");
                }).catch(() => {
                    showToast("SNAPSHOT GENERATED IN TEXTAREA");
                });
            }
        };
    }

    if (restoreBtn) {
        restoreBtn.onclick = () => {
            if (!backupTextarea || !backupTextarea.value.trim()) {
                alert("Please paste the backup JSON block first.");
                return;
            }
            try {
                const backupObj = JSON.parse(backupTextarea.value.trim());
                if (backupObj && (Array.isArray(backupObj.customArticles) || backupObj.customAds || backupObj.editorialSettings)) {
                    if (Array.isArray(backupObj.customArticles)) {
                        localStorage.setItem("anr_custom_articles", JSON.stringify(backupObj.customArticles));
                    }
                    if (backupObj.customAds) {
                        localStorage.setItem("anr_custom_ads", JSON.stringify(backupObj.customAds));
                    }
                    if (backupObj.editorialSettings) {
                        localStorage.setItem("anr_editorial_settings", JSON.stringify(backupObj.editorialSettings));
                    }
                    if (backupObj.tickerBulletins) {
                        localStorage.setItem("anr_ticker_bulletins", JSON.stringify(backupObj.tickerBulletins));
                    }
                    
                    initCustomData();
                    renderArticles();
                    renderCustomAds();
                    renderAdminPostsList();
                    loadEditorialInputs();
                    renderBulletinsManager();
                    syncLiveTicker();
                    loadAdsInputs();
                    
                    showToast("COMPLETE DATABASE RESTORED SUCCESSFULLY");
                } else {
                    alert("Invalid backup format. Make sure it contains valid snapshot keys.");
                }
            } catch (err) {
                console.error("Restore failed:", err);
                alert("Error parsing backup JSON. Please check your config block format.");
            }
        };
    }

    if (factoryResetBtn) {
        factoryResetBtn.onclick = () => {
            const confirmed = confirm("⚠️ DANGER: Are you sure you want to perform a FACTORY RESET?\\nThis will erase all custom articles, custom ads, ticker alerts, and restore the default passcode!");
            if (confirmed) {
                const secondConfirm = confirm("FINAL CONFIRMATION: Reset all database records to original seed state?");
                if (secondConfirm) {
                    localStorage.removeItem("anr_custom_articles");
                    localStorage.removeItem("anr_custom_ads");
                    localStorage.removeItem("anr_editorial_settings");
                    localStorage.removeItem("anr_ticker_bulletins");
                    localStorage.removeItem("anr_admin_passcode");
                    localStorage.removeItem("anr_firebase_config");
                    
                    initCustomData();
                    renderArticles();
                    renderCustomAds();
                    renderAdminPostsList();
                    loadEditorialInputs();
                    renderBulletinsManager();
                    syncLiveTicker();
                    loadAdsInputs();
                    exportBackupToTextarea();
                    
                    showToast("FACTORY RESET COMPLETED");
                }
            }
        };
    }
}
