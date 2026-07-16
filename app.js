/**
 * The Daily Chronograph - Core Application Logic
 * Interactive newspaper operations, bookmarking, searching, speech synthesis, and animations.
 * Extended with Khmer language translation support.
 */

// --- Translation Dictionary ---
const TRANSLATIONS = {
    en: {
        mastheadTitle: "THE DAILY CHRONOGRAPH",
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
        footerLogo: "THE DAILY CHRONOGRAPH",
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
        mastheadTitle: "កាលប្បវត្តិប្រចាំថ្ងៃ",
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
        footerLogo: "កាលប្បវត្តិប្រចាំថ្ងៃ",
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
        id: "hero-1",
        category: "technology",
        author: "ALEXIS VANCE",
        date: "JULY 11, 2026",
        dateKm: "១១ កក្កដា ២០២៦",
        wordCount: "1,200 WORDS",
        wordCountKm: "១,២០០ ពាក្យ",
        readTime: "5 MIN READ",
        readTimeKm: "៥ នាទីអាន",
        image: "assets/images/silicon_telegraph.png",
        en: {
            title: "The Rise of the Silicon Telegraph",
            subTitle: "How Autonomous Agent Networks are Re-wiring the Global Communication Grid",
            preview: "In an era saturated with high-speed fiber lines and chaotic social algorithms, an unexpected shift is occurring. Developers and theorists are looking backward, constructing a simplified, high-integrity 'Silicon Telegraph' run entirely by autonomous agent networks...",
            content: `
                <p class="lead">In an era saturated with high-speed fiber lines and chaotic social algorithms, an unexpected shift is occurring. Developers and theorists are looking backward, constructing a simplified, high-integrity "Silicon Telegraph" run entirely by autonomous agent networks.</p>
                <p>For decades, the internet expanded under the assumption that more bandwidth, higher frame rates, and louder notifications equated to human progress. Yet, the resulting digital landscape has grown increasingly noisy, fragmented, and vulnerable to systemic failures. Enter the Silicon Telegraph: a modern protocol that strip-mines the clutter, returning to asynchronous, low-bandwidth, semantic exchanges.</p>
                <div class="modal-img-wrap">
                    <img src="assets/images/silicon_telegraph.png" alt="Silicon Telegraph Illustration">
                </div>
                <p>At its core, this telegraphic web does not transfer bloated video files or tracking scripts. Instead, it transmits raw semantic intents. Autonomous artificial agents coordinate transactions, resolve complex logical queries, and write summarized news dispatches directly to client screens using compact textual scripts. The user experience is reminiscent of late-nineteenth-century newsprint: clean, static, and deeply analytical.</p>
                <p>Critics argue that removing multimedia components limits accessibility and richness. However, proponents like Dr. Clara Sterling of the Zurich Institute of Decelerated Media believe otherwise: "We don't need fewer pixels; we need more focus. By encoding transactions in simple text frames, we prevent the attention-hacking mechanics that dominate modern software. We let the mind digest information instead of constantly reacting to it."</p>
                <p>It remains to be seen whether the general public will trade their dopamine-inducing feeds for the quiet rustle of the digital newsprint, but for a growing faction of engineers, researchers, and writers, the Silicon Telegraph represents the only path forward out of the digital wilderness.</p>
            `
        },
        km: {
            title: "ការកើនឡើងនៃប្រព័ន្ធទូរលេខស៊ីលីកូន",
            subTitle: "របៀបដែលបណ្តាញភ្នាក់ងារស្វ័យប្រវត្តិកំពុងតភ្ជាប់បណ្តាញគមនាគមន៍សកលឡើងវិញ",
            preview: "នៅក្នុងយុគ្គសម័យដែលពោរពេញទៅដោយខ្សែហ្វាយប៊ឺល្បឿនលឿន និងក្បួនដោះស្រាយបណ្តាញសង្គមដ៏ច្របូកច្របល់ ការផ្លាស់ប្តូរដែលមិនធ្លាប់រំពឹងទុកមួយកំពុងកើតឡើង។ អ្នកអភិវឌ្ឍន៍ និងអ្នកទ្រឹស្តីកំពុងសម្លឹងមើលទៅក្រោយ ដោយបង្កើតឡើងវិញនូវ \"ប្រព័ន្ធទូរលេខស៊ីលីកូន\" ដ៏សាមញ្ញ និងមានសុពលភាពខ្ពស់ ដែលដំណើរការទាំងស្រុងដោយបណ្តាញភ្នាក់ងារស្វ័យប្រវត្តិ...",
            content: `
                <p class="lead">នៅក្នុងយុគ្គសម័យដែលពោរពេញទៅដោយខ្សែហ្វាយប៊ឺល្បឿនលឿន និងក្បួនដោះស្រាយបណ្តាញសង្គមដ៏ច្របូកច្របល់ ការផ្លាស់ប្តូរដែលមិនធ្លាប់រំពឹងទុកមួយកំពុងកើតឡើង។ អ្នកអភិវឌ្ឍន៍ និងអ្នកទ្រឹស្តីកំពុងសម្លឹងមើលទៅក្រោយ ដោយបង្កើតឡើងវិញនូវ "ប្រព័ន្ធទូរលេខស៊ីលីកូន" ដ៏សាមញ្ញ និងមានសុពលភាពខ្ពស់ ដែលដំណើរការទាំងស្រុងដោយបណ្តាញភ្នាក់ងារស្វ័យប្រវត្តិ។</p>
                <p>អស់រយៈពេលជាច្រើនទសវត្សរ៍មកហើយ អ៊ីនធឺណិតបានពង្រីកខ្លួនក្រោមការសន្មត់ថា កម្រិតបញ្ជូនកាន់តែធំ អត្រាស៊ុមខ្ពស់ និងការជូនដំណឹងខ្លាំងៗស្មើនឹងវឌ្ឍនភាពរបស់មនុស្សជាតិ។ ប៉ុន្តែ ទិដ្ឋភាពឌីជីថលដែលជាលទ្ធផលបានក្លាយទៅជាគ្មានសណ្តាប់ធ្នាប់ កាន់តែបែកបាក់ និងងាយរងគ្រោះដោយសារការបរាជ័យជាប្រព័ន្ធ។ សូមណែនាំប្រព័ន្ធទូរលេខស៊ីលីកូន៖ ពិធីការទំនើបមួយដែលកាត់បន្ថយភាពរញ៉េរញ៉ៃ ដោយត្រឡប់ទៅរកការផ្លាស់ប្តូរអសមកាល កម្រិតបញ្ជូនទាប និងមានន័យច្បាស់លាស់។</p>
                <div class="modal-img-wrap">
                    <img src="assets/images/silicon_telegraph.png" alt="Silicon Telegraph Illustration">
                </div>
                <p>ស្នូលរបស់វា គេហទំព័រទូរលេខនេះមិនបញ្ជូនឯកសារវីដេអូធំៗ ឬកូដតាមដានឡើយ។ ផ្ទុយទៅវិញ វាបញ្ជូនតែអត្ថន័យដើម។ ភ្នាក់ងារសិប្បនិម្មិតស្វ័យប្រវត្តិសម្របសម្រួលប្រតិបត្តិការ ដោះស្រាយសំណួរតក្កវិជ្ជាដ៏ស្មុគស្មាញ និងសរសេរអត្ថបទសង្ខេបព័ត៌មានដោយផ្ទាល់ទៅកាន់អេក្រង់អតិថិជន ដោយប្រើកូដអត្ថបទតូចៗ។ បទពិសោធន៍របស់អ្នកប្រើប្រាស់គឺស្រដៀងទៅនឹងការអានសារព័ត៌មាននៅចុងសតវត្សរ៍ទី១៩៖ ស្អាត ស្ងប់ស្ងាត់ និងមានការវិភាគស៊ីជម្រៅ។</p>
                <p>អ្នករិះគន់អះអាងថា ការលុបចោលសមាសធាតុពហុមេឌៀកម្រិតលទ្ធភាពទទួលបាន និងភាពសម្បូរបែប។ ទោះជាយ៉ាងណាក៏ដោយ អ្នកគាំទ្រដូចជាបណ្ឌិត Clara Sterling នៃវិទ្យាស្ថាន Zurich ជឿជាក់ផ្ទុយពីនេះ៖ "យើងមិនត្រូវការភីកសែលតិចជាងមុនទេ យើងត្រូវការការផ្តោតអារម្មណ៍កាន់តែខ្លាំង។ តាមរយៈការសរសេរកូដប្រតិបត្តិការនៅក្នុងស៊ុមអត្ថបទសាមញ្ញ យើងទប់ស្កាត់យន្តការទាក់ទាញការយកចិត្តទុកដាក់ដែលគ្រប់គ្រងកម្មវិធីទំនើប។ យើងបណ្តោយឱ្យចិត្តរំលាយព័ត៌មានជាជាងការប្រតិកម្មទៅនឹងវាជានិច្ច។"</p>
                <p>គេនៅមិនទាន់ដឹងច្បាស់ថា តើសាធារណជនទូទៅនឹងប្តូរការទទួលព័ត៌មានល្បឿនលឿនរបស់ពួកគេសម្រាប់ការអានព័ត៌មានឌីជីថលដ៏ស្ងប់ស្ងាត់នេះឬយ៉ាងណាឡើយ ប៉ុន្តែសម្រាប់ក្រុមវិស្វករ អ្នកស្រាវជ្រាវ និងអ្នកនិពន្ធដែលកំពុងកើនឡើង ប្រព័ន្ធទូរលេខស៊ីលីកូនតំណាងឱ្យផ្លូវតែមួយគត់ដើម្បីចាកចេញពីភាពវឹកវរឌីជីថល។</p>
            `
        }
    },
    {
        id: "world-1",
        category: "world",
        author: "H. G. WELLS JR.",
        date: "JULY 10, 2026",
        dateKm: "១០ កក្កដា ២០២៦",
        wordCount: "850 WORDS",
        wordCountKm: "៨៥០ ពាក្យ",
        readTime: "4 MIN READ",
        readTimeKm: "៤ នាទីអាន",
        image: "assets/images/zeppelin_routes.png",
        en: {
            title: "Zeppelin Cargo Routes Re-open",
            subTitle: "Decarbonizing Logistics via the Stratosphere",
            preview: "The global logistics industry has taken a colossal step backward—and upward. The first fleet of solar-hydrogen freight airships took off from Frankfurt yesterday, carrying heavy electronic components destined for Tokyo...",
            content: `
                <p class="lead">The global logistics industry has taken a colossal step backward—and upward. The first fleet of solar-hydrogen freight airships took off from Frankfurt yesterday, carrying heavy electronic components destined for Tokyo.</p>
                <p>As maritime shipping channels face increasing climate-induced disruptions and high carbon levies, logistics giants are reviving a relic of the early 20th century. Modern zeppelins, equipped with lightweight solar panel membranes and non-flammable hydrogen-helium mixtures, are proving to be exceptionally efficient heavy-lifters.</p>
                <div class="modal-img-wrap">
                    <img src="assets/images/zeppelin_routes.png" alt="Zeppelin Freighter illustration">
                </div>
                <p>While a container ship requires weeks to traverse ocean routes, and cargo planes consume enormous quantities of fossil fuels, these stratospheric giants cruise silently at 150 kilometers per hour. Operating on solar energy during the day and gravity-adjusting ballast control systems, they emit zero carbon emissions.</p>
                <p>"We are not racing," says shipping operator Marcus Thorne. "We are establishing a steady, predictable conveyor belt in the skies. It's a return to slow, clean, high-capacity transport."</p>
            `
        },
        km: {
            title: "បើកដំណើរការឡើងវិញនូវផ្លូវដឹកជញ្ជូនទំនិញតាមហ្សេបភីលីន (Zeppelin)",
            subTitle: "ការកាត់បន្ថយការបំភាយកាបូនក្នុងវិស័យដឹកជញ្ជូនតាមរយៈស្រទាប់បរិយាកាសស្ត្រាតូស្ពែរ",
            preview: "ឧស្សាកម្មដឹកជញ្ជូនសកលបានបោះជំហានថយក្រោយយ៉ាងធំធេង និងឡើងទៅលើមេឃ។ នាវាហោះដឹកទំនិញដែលប្រើថាមពលពន្លឺព្រះអាទិត្យ និងអ៊ីដ្រូសែនដំបូងគេបង្អស់បានហោះចេញពីទីក្រុងហ្វ្រែងហ្វឺតកាលពីម្សិលមិញ ដោយដឹកសមាសធាតុអេឡិចត្រូនិចធ្ងន់ៗឆ្ពោះទៅកាន់ទីក្រុងតូក្យូ...",
            content: `
                <p class="lead">ឧស្សាហកម្មដឹកជញ្ជូនសកលបានបោះជំហានថយក្រោយយ៉ាងធំធេង និងឡើងទៅលើមេឃ។ នាវាហោះដឹកទំនិញដែលប្រើថាមពលពន្លឺព្រះអាទិត្យ និងអ៊ីដ្រូសែនដំបូងគេបង្អស់បានហោះចេញពីទីក្រុងហ្វ្រែងហ្វឺតកាលពីម្សិលមិញ ដោយដឹកសមាសធាតុអេឡិចត្រូនិចធ្ងន់ៗឆ្ពោះទៅកាន់ទីក្រុងតូក្យូ។</p>
                <p>ខណៈដែលផ្លូវដឹកជញ្ជូនតាមសមុទ្រប្រឈមនឹងការរំខានកាន់តែខ្លាំងឡើងដោយសារការប្រែប្រួលអាកាសធាតុ និងការបង់ពន្ធកាបូនខ្ពស់ ក្រុមហ៊ុនដឹកជញ្ជូនធំៗកំពុងរស់ឡើងវិញនូវកេរដំណែលពីដើមសតវត្សរ៍ទី២០។ នាវាហោះ Zeppelin ទំនើប ដែលបំពាក់ដោយស្រទាប់បន្ទះសូឡាទម្ងន់ស្រាល និងការលាយបញ្ចូលគ្នានៃអ៊ីដ្រូសែន-ហេលីយ៉ូមដែលមិនឆេះ កំពុងបង្ហាញពីប្រសិទ្ធភាពខ្ពស់ក្នុងការដឹកជញ្ជូនទំនិញធ្ងន់ៗ។</p>
                <div class="modal-img-wrap">
                    <img src="assets/images/zeppelin_routes.png" alt="Zeppelin Freighter illustration">
                </div>
                <p>ខណៈពេលដែលនាវាដឹកកុងតឺន័រត្រូវការពេលរាប់សប្តាហ៍ដើម្បីឆ្លងកាត់ផ្លូវសមុទ្រ ហើយយន្តហោះដឹកទំនិញប្រើប្រាស់ឥន្ធនៈហ្វូស៊ីលក្នុងបរិមាណដ៏ច្រើន នាវាហោះយក្សទាំងនេះធ្វើដំណើរដោយស្ងប់ស្ងាត់ក្នុងល្បមីត្រ ១៥០ គីឡូម៉ែត្រក្នុងមួយម៉ោង។ ដំណើរការដោយថាមពលពន្លឺព្រះអាទិត្យនៅពេលថ្ងៃ និងប្រព័ន្ធគ្រប់គ្រងតុល្យភាពទម្ងន់ ពួកវាបំភាយឧស្ម័នកាបូនស្មើនឹងសូន្យ។</p>
                <p>លោក Marcus Thorne ប្រតិបត្តិករដឹកជញ្ជូនបាននិយាយថា៖ "យើងមិនមែនកំពុងប្រណាំងប្រជែងគ្នាទេ។ យើងកំពុងបង្កើតខ្សែសង្វាក់ដឹកជញ្ជូនថេរ និងអាចព្យាករណ៍បាននៅលើមេឃ។ វាជាការត្រលប់ទៅរកការដឹកជញ្ជូនយឺត ស្អាត និងមានសមត្ថភាពខ្ពស់។"</p>
            `
        }
    },
    {
        id: "tech-2",
        category: "technology",
        author: "C. J. STROUD",
        date: "JULY 09, 2026",
        dateKm: "០៩ កក្កដា ២០២៦",
        wordCount: "620 WORDS",
        wordCountKm: "៦២០ ពាក្យ",
        readTime: "3 MIN READ",
        readTimeKm: "៣ នាទីអាន",
        image: "assets/images/monospace_return.png",
        en: {
            title: "The Inevitable Return to Monospace",
            subTitle: "Standardized Terminals Capture Developer Focus",
            preview: "In visual design, trends are cyclical. In developer tools, they are brutalist. Standardized monospaced editors are replacing flashy graphical interfaces, as programmers seek maximum speed and zero distraction...",
            content: `
                <p class="lead">In visual design, trends are cyclical. In developer tools, they are brutalist. Standardized monospaced editors are replacing flashy graphical interfaces, as programmers seek maximum speed and zero distraction.</p>
                <p>For years, developers were treated to heavy IDEs, filled with icons, graphs, and multi-colored highlights. But the latest studies in cognitive load indicate that these busy layouts actually impede focus. The solution? A return to raw terminals, command-line interfaces, and monochromatic monospace setups.</p>
                <p>Software development is fundamentally an exercise in writing, reading, and reasoning. The monospaced character set, with its uniform width and predictable grid, respects the developer's cognitive budget. The lack of visual fluff is not a limitation; it is a feature that forces programmers to think clearly and write cleanly.</p>
            `
        },
        km: {
            title: "ការត្រលប់មកវិញដែលមិនអាចជៀសបានទៅកាន់ពុម្ពអក្សរ Monospace",
            subTitle: "ផ្ទាំងបញ្ជាស្តង់ដារទាក់ទាញការយកចិត្តទុកដាក់របស់អ្នកអភិវឌ្ឍន៍",
            preview: "នៅក្នុងការរចនាបែបមើលឃើញ និន្នាការគឺវិលជុំ។ នៅក្នុងឧបករណ៍អ្នកអភិវឌ្ឍន៍ ពួកគេមានភាពសាមញ្ញបំផុត។ កម្មវិធីកែសម្រួលអត្ថបទដែលប្រើពុម្ពអក្សរទំហំស្មើគ្នា (Monospace) កំពុងជំនួសចំណុចប្រទាក់ក្រាហ្វិកដ៏ស្រស់ឆើតឆាយ ខណៈដែលអ្នកសរសេរកម្មវិធីស្វែងរកល្បឿនអតិបរមា និងគ្មានការរំខាន...",
            content: `
                <p class="lead">នៅក្នុងការរចនាបែបមើលឃើញ និន្នាការគឺវិលជុំ។ នៅក្នុងឧបករណ៍អ្នកអភិវឌ្ឍន៍ ពួកគេមានភាពសាមញ្ញបំផុត។ កម្មវិធីកែសម្រួលអត្ថបទដែលប្រើពុម្ពអក្សរទំហំស្មើគ្នា (Monospace) កំពុងជំនួសចំណុចប្រទាក់ក្រាហ្វិកដ៏ស្រស់ឆើតឆាយ ខណៈដែលអ្នកសរសេរកម្មវិធីស្វែងរកល្បឿនអតិបរមា និងគ្មានការរំខាន។</p>
                <p>អស់រយៈពេលជាច្រើនឆ្នាំមកហើយ អ្នកអភិវឌ្ឍន៍ត្រូវបានផ្តល់ជូននូវកម្មវិធីសរសេរកូដធំៗ ដែលពោរពេញទៅដោយរូបតំណាង ក្រាហ្វិក និងការបន្លិចពណ៌ជាច្រើន។ ប៉ុន្តែការសិក្សាចុងក្រោយបង្អស់អំពីបន្ទុកការយល់ដឹងបង្ហាញថា ប្លង់ដ៏មមាញឹកទាំងនេះពិតជារំខានដល់ការផ្តោតអារម្មណ៍។ តើដំណោះស្រាយជាអ្វី? ការត្រលប់ទៅរកផ្ទាំងបញ្ជាឆៅ កម្មវិធីបញ្ជា និងការកំណត់ពុម្ពអក្សរ Monospace ដែលមានតែមួយពណ៌។</p>
                <p>ការអភិវឌ្ឍន៍កម្មវិធីជាមូលដ្ឋានគឺជាលំហាត់ក្នុងការសរសេរ ការអាន និងការវែកញែក។ សំណុំតួអក្សរ Monospace ដែលមានទទឹងឯកសណ្ឋាន និងក្រឡាដែលអាចព្យាករណ៍បាន គោរពដល់កម្រិតយល់ដឹងរបស់អ្នកអភិវឌ្ឍន៍។ ការខ្វះខាតការរចនាដែលមិនចាំបាច់មិនមែនជាកម្រិតកំណត់នោះទេ ប៉ុន្តែជាមុខងារដែលបង្ខំឱ្យអ្នកសរសេរកម្មវិធីគិតឱ្យបានច្បាស់លាស់ និងសរសេរកូដឱ្យបានស្អាតល្អ។</p>
            `
        }
    },
    {
        id: "culture-1",
        category: "culture",
        author: "ELEANOR BRON",
        date: "JULY 08, 2026",
        dateKm: "០៨ កក្កដា ២០២៦",
        wordCount: "940 WORDS",
        wordCountKm: "៩៤០ ពាក្យ",
        readTime: "4 MIN READ",
        readTimeKm: "៤ នាទីអាន",
        image: "assets/images/vintage_stationery.png",
        en: {
            title: "The Rebirth of Vintage Stationery",
            subTitle: "Why the Keyboard Generation is Buying Fountain Pens",
            preview: "Boutique ink sales have spiked by 300 percent this fiscal year. As digital exhaustion peaks, professionals are rediscovering the tactile tactile satisfaction of physical correspondence on heavy, cotton-fiber paper...",
            content: `
                <p class="lead">Boutique ink sales have spiked by 300 percent this fiscal year. As digital exhaustion peaks, professionals are rediscovering the tactile satisfaction of physical correspondence on heavy, cotton-fiber paper.</p>
                <p>There is a unique finality to ink on paper. Unlike a cursor that can delete, edit, or backspace, a pen stroke is a permanent commitment. In a world where everything is editable, temporary, and liquid, physical stationery offers an anchor of solid reality.</p>
                <div class="modal-img-wrap">
                    <img src="assets/images/vintage_stationery.png" alt="Stationery illustration">
                </div>
                <p>Writers, engineers, and executives are forming letter-writing clubs, hosting fountain pen assemblies, and sourcing custom paper weights. In doing so, they are not rejecting technology, but establishing boundaries against its encroachment into their personal thoughts.</p>
            `
        },
        km: {
            title: "ការរស់ឡើងវិញនៃគ្រឿងសរសេរបុរាណ",
            subTitle: "ហេតុអ្វីបានជាយុគសម័យក្តារចុចកំពុងទិញប៊ិចកម្រាស់ធំ",
            preview: "ការលក់ទឹកខ្មៅម៉ាកល្បីៗបានកើនឡើង ៣០០ ភាគរយនៅក្នុងឆ្នាំសារពើពន្ធនេះ។ នៅពេលដែលភាពនឿយហត់ឌីជីថលឡើងដល់កម្រិតកំពូល អ្នកជំនាញកំពុងស្វែងរកឡើងវិញនូវការពេញចិត្តនៃការសរសេរដោយដៃផ្ទាល់នៅលើក្រដាសសរសៃកប្បាសដ៏ក្រាស់...",
            content: `
                <p class="lead">ការលក់ទឹកខ្មៅម៉ាកល្បីៗបានកើនឡើង ៣០០ ភាគរយនៅក្នុងឆ្នាំសារពើពន្ធនេះ។ នៅពេលដែលភាពនឿយហត់ឌីជីថលឡើងដល់កម្រិតកំពូល អ្នកជំនាញកំពុងស្វែងរកឡើងវិញនូវការពេញចិត្តនៃការសរសេរដោយដៃផ្ទាល់នៅលើក្រដាសសរសៃកប្បាសដ៏ក្រាស់។</p>
                <p>មានភាពច្បាស់លាស់តែមួយគត់ចំពោះទឹកខ្មៅនៅលើក្រដាស។ ខុសពីទស្សន៍ទ្រនិចដែលអាចលុប កែសម្រួល ឬត្រឡប់ក្រោយ ការគូសប៊ិចគឺជាការប្តេជ្ញាចិត្តអចិន្ត្រៃយ៍។ នៅក្នុងពិភពលោកមួយដែលអ្វីៗទាំងអស់អាចកែសម្រួលបាន បណ្តោះអាសន្ន និងប្រែប្រួល គ្រឿងសរសេររូបវន្តផ្តល់នូវយុថ្កានៃការពិតដ៏រឹងមាំ។</p>
                <div class="modal-img-wrap">
                    <img src="assets/images/vintage_stationery.png" alt="Stationery illustration">
                </div>
                <p>អ្នកនិពន្ធ វិស្វករ និងនាយកប្រតិបត្តិកំពុងបង្កើតក្លឹបសរសេរសំបុត្រ រៀបចំការជួបជុំប៊ិចទឹក និងស្វែងរកក្រដាសដែលមានគុណភាពខ្ពស់។ ក្នុងការធ្វើពួកគេមិនមែនបដិសេធបច្ចេកវិទ្យានោះទេ ប៉ុន្តែបង្កើតព្រំដែនការពារការជ្រៀតជ្រែករបស់វាទៅក្នុងគំនិតផ្ទាល់ខ្លួនរបស់ពួកគេ។</p>
            `
        }
    },
    {
        id: "opinion-1",
        category: "opinion",
        author: "ARTHUR PENHALIGON",
        date: "JULY 11, 2026",
        dateKm: "១១ កក្កដា ២០២៦",
        wordCount: "750 WORDS",
        wordCountKm: "៧៥០ ពាក្យ",
        readTime: "3 MIN READ",
        readTimeKm: "៣ នាទីអាន",
        image: "assets/images/decelerated_media.png",
        en: {
            title: "The Case for Decelerated Media",
            subTitle: "Why Speed is Poison to Truth",
            preview: "The rush to be first has ruined the ability to be correct. We must slow down our reporting cycles to save public discourse from collapsing into immediate, unverified speculation...",
            content: `
                <p class="lead">The rush to be first has ruined the ability to be correct. We must slow down our reporting cycles to save public discourse from collapsing into immediate, unverified speculation.</p>
                <p>Instantaneous news updates demand instantaneous reactions. We write comments before we read articles; we publish opinions before we check facts. This velocity is profitable for platforms, but toxic to societies. A newspaper should not be a firehose; it should be a curated filter that publishes only after reflection, editing, and deliberate investigation.</p>
            `
        },
        km: {
            title: "ទស្សនៈគាំទ្រប្រព័ន្ធផ្សព្វផ្សាយបែបយឺត",
            subTitle: "ហេតុអ្វីបានជាល្បឿនគឺជាថ្នាំពុលសម្រាប់ការពិត",
            preview: "ការប្រញាប់ប្រញាល់ដើម្បីក្លាយជាអ្នកដំបូងបានបំផ្លាញសមត្ថភាពក្នុងការផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវ។ យើងត្រូវតែពន្យឺតវដ្តនៃការរាយការណ៍របស់យើង ដើម្បីសង្គ្រោះការពិភាក្សាជាសាធារណៈពីការដួលរលំទៅជាការស្មានភ្លាមៗ និងគ្មានការផ្ទៀងផ្ទាត់...",
            content: `
                <p class="lead">ការប្រញាប់ប្រញាល់ដើម្បីក្លាយជាអ្នកដំបូងបានបំផ្លាញសមត្ថភាពក្នុងការផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវ។ យើងត្រូវតែពន្យឺតវដ្តនៃការរាយការណ៍របស់យើង ដើម្បីសង្គ្រោះការពិភាក្សាជាសាធារណៈពីការដួលរលំទៅជាការស្មានភ្លាមៗ និងគ្មានការផ្ទៀងផ្ទាត់។</p>
                <p>ការធ្វើបច្ចុប្បន្នភាពព័ត៌មានភ្លាមៗទាមទារការប្រតិកម្មភ្លាមៗ។ យើងសរសេរមតិយោបល់មុនពេលយើងអានអត្ថបទ យើងបោះពុម្ពមតិយោបល់មុនពេលយើងពិនិត្យមើលការពិត។ ល្បឿននេះផ្តល់ប្រាក់ចំណេញសម្រាប់វេទិកា ប៉ុន្តែមានជាតិពុលដល់សង្គម។ សារព័ត៌មានមិនគួរជាទុយោពន្លត់អគ្គីភ័យឡើយ វាគួរតែជាតម្រងដែលបានជ្រើសរើសយ៉ាងយកចិត្តទុកដាក់ ដែលបោះពុម្ពផ្សាយតែបន្ទាប់ពីការពិចារណា ការកែសម្រួល និងការស៊ើបអង្កេតដោយចេតនាប៉ុណ្ណោះ។</p>
            `
        }
    },
    {
        id: "opinion-2",
        category: "opinion",
        author: "DR. EMILY CHEN",
        date: "JULY 07, 2026",
        dateKm: "០៧ កក្កដា ២០២៦",
        wordCount: "980 WORDS",
        wordCountKm: "៩៨០ ពាក្យ",
        readTime: "4 MIN READ",
        readTimeKm: "៤ នាទីអាន",
        image: "assets/images/think_feel.png",
        en: {
            title: "Machines That Think, Humans That Feel",
            subTitle: "Redefining the Human Edge in a Automated World",
            preview: "As artificial intelligence learns to synthesize facts and produce coherent texts, humans must retreat to what we do best: feeling, questioning, and making ethical judgments...",
            content: `
                <p class="lead">As artificial intelligence learns to synthesize facts and produce coherent texts, humans must retreat to what we do best: feeling, questioning, and making ethical judgments.</p>
                <p>If a machine can write a perfect stock report or summary in microseconds, it is foolish to compete with it on raw analytical speed. Instead, the writer's goal must shift toward emotional depth, philosophical nuance, and critical interrogation. The future of journalism belongs not to information compilers, but to human storytellers who can navigate the complex web of moral accountability.</p>
            `
        },
        km: {
            title: "ម៉ាស៊ីនដែលគិត មនុស្សដែលចេះដឹងគុណតម្លៃអារម្មណ៍",
            subTitle: "ការកំណត់ឡើងវិញនូវអត្ថប្រយោជន៍របស់មនុស្សនៅក្នុងពិភពស្វ័យប្រវត្តិកម្ម",
            preview: "នៅពេលដែលបញ្ញាសិប្បនិម្មិតរៀនសំយោគការពិត និងផលិតអត្ថបទដែលមានភាពស៊ីសង្វាក់គ្នា មនុស្សត្រូវតែត្រលប់ទៅរកអ្វីដែលយើងធ្វើបានល្អបំផុត៖ អារម្មណ៍ ការចោទសួរ និងការវិនិច្ឆ័យប្រកបដោយសីលធម៌...",
            content: `
                <p class="lead">នៅពេលដែលបញ្ញាសិប្បនិម្មិតរៀនសំយោគការពិត និងផលិតអត្ថបទដែលមានភាពស៊ីសង្វាក់គ្នា មនុស្សត្រូវតែត្រលប់ទៅរកអ្វីដែលយើងធ្វើបានល្អបំផុត៖ អារម្មណ៍ ការចោទសួរ និងការវិនិច្ឆ័យប្រកបដោយសីលធម៌។</p>
                <p>ប្រសិនបើម៉ាស៊ីនអាចសរសេររបាយការណ៍ភាគហ៊ុន ឬសង្ខេបដ៏ល្អឥតខ្ចោះក្នុងរយៈពេលមីក្រូវិនាទី វាក៏ជាការល្ងង់ខ្លៅក្នុងការប្រកួតប្រជែងជាមួយវាលើល្បឿនវិភាគឆៅ។ ផ្ទុយទៅវិញ គោលដៅរបស់អ្នកនិពន្ធត្រូវតែផ្លាស់ប្តូរទៅរកជម្រៅអារម្មណ៍ ភាពខុសគ្នានៃទស្សនវិជ្ជា និងការស៊ើបអង្កេតយ៉ាងហ្មត់ចត់។ អនាគតនៃសារព័ត៌មានមិនមែនជារបស់អ្នកចងក្រងព័ត៌មាននោះទេ ប៉ុន្តែជារបស់អ្នកនិពន្ធរឿងដែលជាមនុស្សដែលអាចរុករកបណ្តាញដ៏ស្មុគស្មាញនៃគណនេយ្យភាពសីលធម៌។</p>
            `
        }
    }
];

// --- Quick Bulletins ---
const BULLETINS = [
    {
        time: "18:45",
        en: "GOLD STANDARD INDEX RISES 2.3% IN LATE TRADING.",
        km: "សន្ទស្សន៍ស្តង់ដារមាសកើនឡើង ២.៣% ក្នុងការជួញដូរចុងក្រោយ។"
    },
    {
        time: "17:30",
        en: "LONDON UNDERGROUND ANNOUNCES EXPERIMENTAL STEAM CARRIAGE REMOVAL.",
        km: "រថភ្លើងក្រោមដីឡុងដ៍ប្រកាសពីការដកចេញរទេះចំហាយទឹកសាកល្បង។"
    },
    {
        time: "15:10",
        en: "PARISIAN ARTISTS DEBATE DRAFTING RULES ON MATHEMATICAL DRAWINGS.",
        km: "សិល្បករទីក្រុងប៉ារីសជជែកដេញដោលអំពីវិធានការព្រាងលើគំនូរគណិតវិទ្យា។"
    },
    {
        time: "12:05",
        en: "TRANSATLANTIC TELEGRAM CABLE SUFFERS MINOR MAGNETIC INTERFERENCE.",
        km: "ខ្សែទូរលេខឆ្លងកាត់មហាសមុទ្រអាត្លង់ទិកជួបប្រទះការជ្រៀតជ្រែកម៉ាញេទិកបន្តិចបន្តួច។"
    },
    {
        time: "09:00",
        en: "WEATHER OFFICE PREDICTS DENSE SOOTY MIST OVER THAMES ESTUARY.",
        km: "ការិយាល័យអាកាសធាតុព្យាករណ៍ថាមានអ័ព្ទផ្សែងក្រាស់នៅលើដៃទន្លេថេមស៍។"
    }
];

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

// --- DOM Elements ---
const articlesGrid = document.getElementById("main-articles-grid");
const bulletinsList = document.getElementById("bulletins-list");
const opinionList = document.getElementById("opinion-list");
const tickerContent = document.getElementById("ticker-content");
const liveTimeEl = document.getElementById("live-time");
const themeToggle = document.getElementById("theme-toggle");
const bookmarkToggleBtn = document.getElementById("bookmark-toggle-btn");
let bookmarkCountEl = document.getElementById("bookmark-count");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const navLinks = document.querySelectorAll(".nav-link");

// Weather Elements
const widgetTemp = document.getElementById("widget-temp");
const widgetDesc = document.getElementById("widget-desc");
const weatherWidgetTop = document.getElementById("weather-widget");
const weatherCityInput = document.getElementById("weather-city");
const weatherCityBtn = document.getElementById("weather-city-btn");

// Newsletter Elements
const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmail = document.getElementById("newsletter-email");
const newsletterStatus = document.getElementById("newsletter-status");
const stampConfirmed = document.getElementById("stamp-confirmed");

// Modal Elements
const articleModal = document.getElementById("article-modal");
const modalArticleContent = document.getElementById("modal-article-content");
const modalClose = document.getElementById("modal-close");
const fontDecBtn = document.getElementById("reader-font-dec");
const fontIncBtn = document.getElementById("reader-font-inc");
const readerTtsBtn = document.getElementById("reader-tts");
const readerBookmarkBtn = document.getElementById("reader-bookmark");
const readerPrintBtn = document.getElementById("reader-print");

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initClock();
    initTicker();
    initTheme();
    translateUI(); // This renders the static elements and triggers the initial page render
    setupEventListeners();
});

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
        const cardClass = isHero ? "news-card hero" : "news-card";
        const dropCapClass = isHero ? "drop-cap" : "";
        const bookmarkIcon = isSaved ? "★" : "☆";

        const contentLang = art[currentLanguage];
        const readTimeStr = currentLanguage === "km" ? art.readTimeKm : art.readTime;
        const categoryUpper = currentLanguage === "km" ? t.nav[art.category] || art.category : art.category.toUpperCase();

        articlesGrid.innerHTML += `
            <article class="${cardClass}">
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
                <p class="card-body-preview ${dropCapClass}">${contentLang.preview}</p>
                <span class="read-more-btn" onclick="openArticleModal('${art.id}')">${t.readDispatch} &rarr;</span>
            </article>
        `;
    });
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
    
    // Header & Buttons
    bookmarkToggleBtn.innerHTML = `${t.savedArticles} (<span id="bookmark-count">${bookmarkedArticles.length}</span>)`;
    bookmarkCountEl = document.getElementById("bookmark-count");
    
    const nextThemeText = (document.documentElement.getAttribute("data-theme") || "light") === "dark" 
        ? t.dayEdition 
        : t.nightEdition;
    themeToggle.textContent = nextThemeText;
    
    document.getElementById("language-toggle").textContent = currentLanguage === "en" ? "ភាសាខ្មែរ" : "English";

    // Masthead
    document.getElementById("masthead-vol").textContent = t.volNo;
    document.getElementById("masthead-title-text").textContent = t.mastheadTitle;
    document.getElementById("masthead-price").textContent = t.price;
    document.getElementById("masthead-est").textContent = t.est;
    
    // Navigation (Front Page, World, etc.)
    navLinks.forEach(link => {
        const cat = link.getAttribute("data-category");
        if (t.nav[cat]) {
            link.textContent = t.nav[cat];
        }
    });

    // Ticker Title
    document.getElementById("ticker-title-text").textContent = t.bulletins;

    // Sidebar titles
    document.getElementById("sidebar-left-title").textContent = t.latestFlashes;
    document.getElementById("sidebar-right-title").textContent = t.opinionEditorial;

    // Vintage Ad
    document.getElementById("ad-title-text").textContent = t.adTitle;
    document.getElementById("ad-body-text").textContent = t.adBody;
    document.getElementById("ad-sub-text").textContent = t.adSub;

    // Weather Card
    document.getElementById("weather-detail-title").textContent = t.meteorologicalStamp;
    weatherCityBtn.textContent = t.update;
    weatherCityInput.placeholder = t.enterCityPlaceholder;

    // Newsletter Section
    document.getElementById("newsletter-title-text").textContent = t.subscribeDispatch;
    document.getElementById("newsletter-desc-text").textContent = t.deliveredMailbox;
    newsletterEmail.placeholder = t.emailPlaceholder;
    document.getElementById("newsletter-btn-text").textContent = t.engrave;
    stampConfirmed.textContent = t.approved;

    // Footer Info
    document.getElementById("footer-logo-text").textContent = t.footerLogo;
    document.getElementById("footer-desc-text").textContent = t.footerDesc;
    document.getElementById("footer-copyright-text").textContent = t.copyright;

    // Modal Control Tooltips & Labels
    fontDecBtn.title = t.fontDecTitle;
    fontIncBtn.title = t.fontIncTitle;
    readerTtsBtn.textContent = t.speak;
    readerTtsBtn.title = t.speak;
    readerBookmarkBtn.title = t.save;
    readerPrintBtn.title = t.print;

    // Redraw dynamic ticker and feeds
    initTicker();
    renderBulletins();
    renderOpinions();
    renderArticles();
}

// --- Events Setup ---
function setupEventListeners() {
    // Theme Toggle
    themeToggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("chronograph_theme", next);
        updateThemeButtonText(next);
        
        const t = TRANSLATIONS[currentLanguage];
        showToast(next === "dark" ? (currentLanguage === "km" ? "របៀបរាត្រីសកម្ម" : "NIGHT EDITION ACTIVE") : (currentLanguage === "km" ? "របៀបថ្ងៃសកម្ម" : "DAY EDITION ACTIVE"));
    });

    // Language Toggle
    document.getElementById("language-toggle").addEventListener("click", () => {
        currentLanguage = currentLanguage === "en" ? "km" : "en";
        localStorage.setItem("chronograph_lang", currentLanguage);
        translateUI();
        initClock(); // Re-trigger clock to format in active language
        
        const isKm = currentLanguage === "km";
        showToast(isKm ? "ភាសាត្រូវបានផ្លាស់ប្តូរទៅជា ភាសាខ្មែរ" : "Language switched to English");
    });

    // Nav Category Clicks
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            currentCategory = link.getAttribute("data-category");
            searchQuery = ""; // Reset search on category toggle
            searchInput.value = "";
            renderArticles();
        });
    });

    // Saved Articles Toggle Button
    bookmarkToggleBtn.addEventListener("click", () => {
        currentCategory = "saved";
        renderArticles();
        updateBookmarkUI();
    });

    // Search Operations
    const performSearch = () => {
        searchQuery = searchInput.value.trim();
        renderArticles();
    };
    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") performSearch();
    });

    // Weather manual update
    weatherCityBtn.addEventListener("click", updateWeather);
    weatherCityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") updateWeather();
    });

    // Modal close actions
    modalClose.addEventListener("click", closeArticleModal);
    articleModal.addEventListener("click", (e) => {
        if (e.target === articleModal) closeArticleModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeArticleModal();
    });

    // Modal Font adjustments
    fontIncBtn.addEventListener("click", () => {
        if (readerFontSizeMultiplier < 1.6) {
            readerFontSizeMultiplier += 0.1;
            applyFontSize();
        }
    });
    fontDecBtn.addEventListener("click", () => {
        if (readerFontSizeMultiplier > 0.8) {
            readerFontSizeMultiplier -= 0.1;
            applyFontSize();
        }
    });

    // Newsletter submit + typewriter rubber stamp trigger
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = newsletterEmail.value.trim();
        const t = TRANSLATIONS[currentLanguage];
        if (email) {
            newsletterStatus.textContent = t.subscribing;
            newsletterEmail.disabled = true;
            newsletterForm.querySelector("button").disabled = true;

            setTimeout(() => {
                newsletterStatus.textContent = t.subscribedAt + email.toUpperCase();
                stampConfirmed.classList.add("active");
                showToast(t.subscribedToast);
            }, 1500);
        }
    });
}
