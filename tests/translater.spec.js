  const { test, expect } = require('@playwright/test');

const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

 const TEST_DATA = {
  positive: [
    { 
      tcId: 'Pos_Fun_0001', 
      name: 'Simple daily action sentence', 
      input: 'mama dhaen yaaluvekge gedhara inne.', 
      expected: 'මම දැන් යාලුවෙක්ගෙ ගෙදර ඉන්නේ.', 
      category: 'Daily language usage', 
      grammar: 'Simple sentence', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Fun_0002', 
      name: 'Long mixed-language input with slang', 
      input: 'Machan, adha office ekee printer eka break unaa. Please IT team ekata report karanna puluvandha? Mama yanakota issue eka check karanna oonea. Email ekak amaaru nam WhatsApp message ekak dhaanna.', 
      expected: 'මචන්, අද office එකේ printer එක break උනා. Please IT team එකට report කරන්න පුලුවන්ද? මම යනකොට issue එක check කරන්න ඕනේ. Email එකක් අමාරු නම් WhatsApp message එකක් දාන්න.', 
      category: 'Mixed Singlish + English', 
      grammar: 'Compound structure', 
      length: 'M' 
    },
    { 
      tcId: 'Pos_Fun_0003', 
      name: 'Convert a short request phrase', 
      input: 'mata oyaage paeena dhenna puluvandha', 
      expected: 'මට ඔයාගෙ පෑන දෙන්න පුලුවන්ද', 
      category: 'Greeting / request / response', 
      grammar: 'Interrogative (question)', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Fun_0004', 
      name: 'Paragraph-style input', 
      input: 'pasugiya dhina keehipayak thula raTata aethi vuu tharuna vaessa saha sudu suLi kuNaatu heethuven naagarika saha grama vaasana pradesha aneka vaenaskam walata muhuna dunnu athara, eya pramukha vaShayen maarga, paasal saha jala viduli pahasukam walata bala paeminiya. ehi prathiPhalayak lesa pravaahana aDhikaariya visin prakaasha kalae, kelani, kaluthara saha gampaha pradesha wala maarga kotas keehipayak avasthaava nisa vaasika vaShayen avahira vuu bava saha eya ikmanin thavath avasthaavalata avarjana karamin nivaradhi kirima sandahaa kriya maarga ganna bava ya.', 
      expected: 'පසුගිය දින කිහිපයක් තුල රටට දරුනු වැස්ස සහ සුළි කුණාටු හේතුවෙන් නාගරික සහ ග්‍රාම  ප්‍රදේශ අනේක වෙනස්කම් වලට මුහුන දුන්නු අතර, එය ප්‍රමුඛ වෂයෙන් මාර්ග, පාසල් සහ ජල විදුලි පහසුකම් වලට බල පැමිණියා. එහි ප්‍රතිඵලයක් ලෙස ප්‍රවාහන අධිකාරිය විසින් ප්‍රකාශ කල, කැලනි, කලුතර සහ හංවැල්ල ප්‍රදේශ වල මාර්ග කොටස් කිහිපයක් අවස්තාව නිසා වාර්ශික වෂයෙන් අවහිර වූ බව සහ එය ඉක්මනින් තවත් අවස්තාවලට ආවර්ජන කරමින් නිවරදි කිරිම සදහා ක්‍රියා මාර්ග ගන්නා බව ය.', 
      category: 'Word combination / phrase pattern', 
      grammar: 'Complex sentence', 
      length: 'L' 
    },
    { 
      tcId: 'Pos_Fun_0005', 
      name: 'Polite request', 
      input: 'karuNaakara mata report eka evanna puLuvandha?', 
      expected: 'කරුණාකර මට report එක එවන්න පුළුවන්ද?', 
      category: 'Greeting / request / response', 
      grammar: 'Interrogative (question)', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Fun_0006', 
      name: 'Convert repeated words for emphasis', 
      input: 'eka eka dheeval gaena mata hithenavaa', 
      expected: 'එක එක දේවල් ගැන මට හිතෙනවා', 
      category: 'Daily language usage', 
      grammar: 'Simple sentence', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Fun_0007', 
      name: 'Mixed English brand names', 
      input: 'mama WiFi connect karala Zoom meeting ekata join unaa.', 
      expected: 'මම WiFi  connect කරල Zoom meeting එකට join උනා.', 
      category: 'Mixed language', 
      grammar: 'Past tense', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Fun_0008', 
      name: 'Sentence with currency', 
      input: 'Eyaata Rs.2500 dhenna oone mama.', 
      expected: 'එයාට Rs. 2500 දෙන්න ඕනෙ මම.', 
      category: 'Currency handling', 
      grammar: 'Simple sentence', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Fun_0009', 
      name: 'Informal spoken sentence', 
      input: 'adoo adha traffic hari vaedine?', 
      expected: 'අඩෝ අද traffic හරි වැඩිනෙ?', 
      category: 'Informal conversation', 
      grammar: 'Interrogative', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Fun_0010', 
      name: 'Plural subject using', 
      input: 'lamayi school yanavaa dhaen.', 
      expected: 'ලමයි school යනවා දැන්.', 
      category: 'Plural subjects', 
      grammar: 'Present tense', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Fun_0011', 
      name: 'Past tense experience', 
      input: 'api kalin meeka try karalaa thiyenavaa.', 
      expected: 'අපි කලින් මේක try කරලා තියෙනවා.', 
      category: 'Past tense', 
      grammar: 'Complex sentence', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Fun_0012', 
      name: 'Request with condition', 
      input: 'oyaata puLuvannam document eka adha evanna.', 
      expected: 'ඔයාට පුළුවන්නම් document එක අද එවන්න.', 
      category: 'Conditional request', 
      grammar: 'Imperative', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Fun_0013', 
      name: 'Negative statement', 
      input: 'mama adha office yanne naehae.', 
      expected: 'මම අද office යන්නෙ නැහැ.', 
      category: 'Negation', 
      grammar: 'Negative sentence', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Fun_0014', 
      name: 'Greetings', 
      input: 'Suba dhavasak obata!!', 
      expected: 'සුබ දවසක් ඔබට!!', 
      category: 'Greetings', 
      grammar: 'Simple sentence', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Fun_0015', 
      name: 'Mixed-language office-related paragraph', 
      input: 'company eka adha dhavase IT infrastructure update ekak karanna plan karala thiyenavaa, ee anuva servers upgrade kirima, security patches apply kirima saha employee la ta Email magin notice ekak yavanna venavaa kiyala management team eka kivvaa.', 
      expected: 'company එක අද දවසෙ IT infrastructure update එකක් කරන්න plan කරල තියෙනවා, ඒ අනුව servers upgrade කිරිම, security patches apply කිරිම සහ employee ල ට Email මගින් notice එකක් යවන්න වෙනවා කියල management team එක කිව්වා.', 
      category: 'Office communication', 
      grammar: 'Complex paragraph', 
      length: 'L' 
    },
    { 
      tcId: 'Pos_Fun_0016', 
      name: 'Medium-length complex daily scenario', 
      input: 'adha udhee mama bus eka late una nisaa office yanna parakku unaa, namuth manager ta message ekak dhunnama eyaa eka theerum gaththaa .eyaa mata baenne naee.', 
      expected: 'අද උදේ මම bus එක late උන නිසා office යන්න පරක්කු උනා, නමුත් manager ට message එකක් දුන්නම එයා එක තේරුම් ගත්තා .එයා මට බැන්නෙ නෑ.', 
      category: 'Daily scenario', 
      grammar: 'Compound sentence', 
      length: 'M' 
    },
    { 
      tcId: 'Pos_Fun_0017', 
      name: 'Polite request narrative paragraph', 
      input: 'oyaa adha dhavase podi free time ekak thiyenavaa nam karuNaakarala mage university project document tika poddak balala eke thiyena mistakes, improvements saha suggestions tika mata kiyanna kiyanavadha..? aeththatama loku udhavvak eeka, mama meeka submit karanna kalin final review ekak karaganna oona nisaa... meka karala dhenna puluvannam loku udhavvak mata mokadha meeka magee final project eka...please', 
      expected: 'ඔයා අද දවසෙ පොඩි free time එකක් තියෙනවා නම් කරුණාකරල mage university project document ටික පොඩ්ඩක් බලල eke තියෙන mistakes, improvements සහ suggestions ටික මට කියන්න කියනවද..? ඇත්තටම ලොකු උදව්වක් ඒක, මම මේක submit කරන්න කලින් final review එකක් කරගන්න ඕන නිසා... මෙක කරල දෙන්න පුලුවන්නම් ලොකු උදව්වක් මට මොකද මේක මගේ final project එක...please', 
      category: 'Polite narrative', 
      grammar: 'Complex paragraph', 
      length: 'L' 
    },
    { 
      tcId: 'Pos_Fun_0018', 
      name: 'Informal conversational story', 
      input: 'ado machan adha api yaluvo tika ekka udhe indala match ekak balala passe podi trip ekak yanna haedhuve...namuth dhavas purama aeththatama traffic loku vidhihata aethi unaa saha weather eketh loku venasak pennuva, ehema unaath api kauruth upset unee nae, api joke kara kara sindhu ahagena hari lassanata dawasa  enjoy kala... aeththatama hithenne hondha memory ekak vidhihata meeka thiyaaganna puluvan kiyalaa', 
      expected: 'ado මචන් අද අපි යලුවො ටික එක්ක උදෙ ඉන්ඩල match එකක් බලල පස්සෙ පොඩි trip එකක් යන්න හැදුවෙ...නමුත් දවස් පුරම ඇත්තටම traffic ලොකු විදිහට ඇති උනා සහ weather එකෙත් ලොකු වෙනසක් පෙන්නුව, එහෙම උනාත් අපි කෞරුත් upset උනේ නැ, අපි joke කර කර සින්දු අහගෙන හරි ලස්සනට ඩwඅස  enjoy කල... ඇත්තටම හිතෙන්නෙ හොන්ද memory එකක් විදිහට මේක තියාගන්න පුලුවන් කියලා', 
      category: 'Conversational story', 
      grammar: 'Narrative paragraph', 
      length: 'L' 
    },
    { 
      tcId: 'Pos_Fun_0019', 
      name: 'Paragraph with date', 
      input: 'giya avurudhdhe e kiyanne 2023/09/34 dhavase thamaa anthimatama party ekakata giye mama...ekath hodhama yaaluvage birthday party eka nisaa giye...naeththan mama yannee nae', 
      expected: 'ගිය අවුරුද්දෙ එ කියන්නෙ 2023/09/34 දවසෙ තමාඅන්තිමටම party එකකට ගියෙ මම...එකත් හොදම යාලුවගෙ birthday party එක නිසා ගියෙ...නැත්තන් මම යන්නේ නැ', 
      category: 'Date handling', 
      grammar: 'Narrative', 
      length: 'M' 
    },
    { 
      tcId: 'Pos_Fun_0020', 
      name: 'Abbreviation using', 
      input: 'bank eken kiyala thiyenne OTP eka SMS ekak aavama kaatavath yavanna epaa kiyalaa. Naeththan apee account eka hack venna puluvan', 
      expected: 'bank එකෙන් කියල තියෙන්නෙ OTP එක SMS එකක් ආවම කාටවත් යවන්න එපා කියලා. ණැත්තන් අපේ account එක hack වෙන්න පුලුවන්', 
      category: 'Abbreviations', 
      grammar: 'Warning message', 
      length: 'M' 
    },
    { 
      tcId: 'Pos_Fun_0021', 
      name: 'Multiple space input', 
      input: 'oyaa   passe   call    karanna.', 
      expected: 'ඔයා   පස්සෙ   call    කරන්න.', 
      category: 'Spacing', 
      grammar: 'Command', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Fun_0022', 
      name: 'Containing a place & colloquial phrasing', 
      input: 'siraavata mama hithuve nae eyaa hetama gampaha yayi kiyalaa.', 
      expected: 'සිරාවට මම හිතුවෙ නැ එයා හෙටම gampaha යයි කියලා.', 
      category: 'Place names', 
      grammar: 'Colloquial', 
      length: 'M' 
    },
    { 
      tcId: 'Pos_Fun_0023', 
      name: 'Convert multi-line input', 
      input: 'mama heta saloon ekata yanna oone                                                          gihilla thava gamanak yanna oonee', 
      expected: 'මම හෙට saloon එකට යන්න ඕනෙ                                                           ගිහිල්ල තව ගමනක් යන්න ඕනේ', 
      category: 'Multi-line input', 
      grammar: 'Multi-sentence', 
      length: 'M' 
    },
    { 
      tcId: 'Pos_Fun_0024', 
      name: 'Convert future plan sentence', 
      input: 'labana maasee apee gedhara dhaanayak thiyenavaa.', 
      expected: 'ලබන මාසේ අපේ ගෙදර දානයක් තියෙනවා.', 
      category: 'Future plans', 
      grammar: 'Future tense', 
      length: 'S' 
    }
  ],

  negative: [
    { 
      tcId: 'Neg_Fun_0001', 
      name: 'Handle excessive spelling errors', 
      input: 'mama dhaen padam karanav', 
      expected: 'මම දැන් පාඩම් කරනවා', 
      category: 'Spelling errors', 
      grammar: 'Misspelled', 
      length: 'S' 
    },
    { 
      tcId: 'Neg_Fun_0002', 
      name: 'Input with inconsistent language switching', 
      input: 'mama adha meeting ekata attend karala then lunch ekak gaththa but traffic very bad unaa evening eke.', 
      expected: 'මම අද meeting එකට attend කරල then lunch එකක් ගත්ත but traffic very bad උනා evening  එකේ.', 
      category: 'Inconsistent language', 
      grammar: 'Mixed language', 
      length: 'M' 
    },
    { 
      tcId: 'Neg_Fun_0003', 
      name: 'Input with excessive punctuation', 
      input: 'mama adha!!! gedhara??? yanna..... haedhuve eth !!! vaessa!!! nisaa yanna baeri vunaa!!!', 
      expected: 'මම අද ගෙදර යන්න හැදුවෙ එත් වැස්ස නිසා යන්න බැරි වුනා', 
      category: 'Excessive punctuation', 
      grammar: 'Over-punctuated', 
      length: 'M' 
    },
    { 
      tcId: 'Neg_Fun_0004', 
      name: 'Input with broken grammar and random order', 
      input: 'eken mama adha office giyaa saha dhaen vaeda karanavaa saha heta vacation yanna unaa kiyalaa kiyanneth ekama sentence eke.', 
      expected: 'එකෙන් මම අද office ගියා සහ දැන් වැඩ කරනවා සහ හෙට vacation යන්න උනා කියලා කියන්නෙත් එකම sentence එකෙ.', 
      category: 'Broken grammar', 
      grammar: 'Disordered', 
      length: 'M' 
    },
    { 
      tcId: 'Neg_Fun_0005', 
      name: 'Convert heavy slang', 
      input: 'ado bn eeka hariyata karapan', 
      expected: 'අඩෝ බ්න් ඒක හරියට කරපන්', 
      category: 'Heavy slang', 
      grammar: 'Slang', 
      length: 'S' 
    },
    { 
      tcId: 'Neg_Fun_0006', 
      name: 'Informal, slangy and abbreviated', 
      input: 'dn warenko bn ape gedra', 
      expected: 'දැන් වරෙන්කො බන් අපේ ගෙදර', 
      category: 'Abbreviated slang', 
      grammar: 'Heavily abbreviated', 
      length: 'S' 
    },
    { 
      tcId: 'Neg_Fun_0007', 
      name: 'Mixed numeric format', 
      input: 'mama Rs. one thousand gannavaa', 
      expected: 'මම Rs. 1000 ගන්නවා', 
      category: 'Mixed numeric format', 
      grammar: 'Word-number mix', 
      length: 'S' 
    },
    { 
      tcId: 'Neg_Fun_0008', 
      name: 'Convert future plan sentence', 
      input: 'mama GEDHARA INNE DAEN', 
      expected: 'මම ගෙදර ඉන්නේ දැන්', 
      category: 'Uppercase input', 
      grammar: 'All caps', 
      length: 'S' 
    },
    { 
      tcId: 'Neg_Fun_0009', 
      name: 'Repeated unit times', 
      input: 'mama 100kgkg bath gaththaa', 
      expected: 'මම 100kg බත් ගත්තා', 
      category: 'Repeated units', 
      grammar: 'Unit error', 
      length: 'S' 
    },
    { 
      tcId: 'Neg_Fun_0010', 
      name: 'Informal and exaggerated', 
      input: 'eekanam aththatama supiriiiii', 
      expected: 'ඒකනම් ඇත්තටම සුපිරී', 
      category: 'Exaggerated spelling', 
      grammar: 'Over-extended', 
      length: 'S' 
    }
  ],

  edgeCases: [
    { 
      tcId: 'Pos_Edge_0001', 
      name: 'Empty input', 
      input: '', 
      expected: '', 
      category: 'Edge case', 
      grammar: 'Empty', 
      length: 'Empty' 
    },
    { 
      tcId: 'Pos_Edge_0002', 
      name: 'Single character', 
      input: 'a', 
      expected: 'අ', 
      category: 'Edge case', 
      grammar: 'Single char', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Edge_0003', 
      name: 'Only numbers', 
      input: '123', 
      expected: '123', 
      category: 'Edge case', 
      grammar: 'Numbers only', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Edge_0004', 
      name: 'Only punctuation', 
      input: '!@#$%', 
      expected: '!@#$%', 
      category: 'Edge case', 
      grammar: 'Punctuation only', 
      length: 'S' 
    },
    { 
      tcId: 'Pos_Edge_0005', 
      name: 'Mixed case input', 
      input: 'MaMa GiYaA', 
      expected: 'මම ගියා', 
      category: 'Edge case', 
      grammar: 'Mixed case', 
      length: 'S' 
    }
  ],

  ui: {
    tcId: 'Neg_UI_0001',
    name: 'UI handling of rapid continuous typing',
    input: 'mama dhaen gedhara inne saha kaema kannawa passe poddak hitapan',
    partialInput: 'mama dhaen',
    expectedFull: 'මම දැන් ගෙදර ඉන්නේ සහ කෑම කන්නවා පස්සේ පොඩ්ඩක් හිතපන්',
    category: 'Usability',
    grammar: 'Mixed sentence',
    length: 'M'
  }
};

 
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

 
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  
  test.describe('Edge Cases Tests', () => {
    for (const testCase of TEST_DATA.edgeCases) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

 
  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();
      
       
      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 50 });
      
       
      await page.waitForTimeout(1000);
      
     
      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);
      
      
      const remainingText = TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length);
      for (let i = 0; i < remainingText.length; i++) {
        await input.press(remainingText[i]);
        await page.waitForTimeout(50);
      }
      
       
      await translator.waitForOutput();
      
      
      outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);
      
      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});