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
