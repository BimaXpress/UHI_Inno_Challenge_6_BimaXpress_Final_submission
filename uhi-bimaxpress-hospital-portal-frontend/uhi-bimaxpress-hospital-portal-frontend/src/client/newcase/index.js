import apiConstants from "../../utils/apiConstants";

export default class NewCase {
  constructor(client) {
    this.client = client;
    //this.resourceUrl = "/cabReviewSummary";
    this.resourceUrl = "/todos";
  }

  list(filter) {
    return this.client.get(`${this.resourceUrl}/1`);
  }

  list2(filter) {
    return this.client.get(`${this.resourceUrl}/2`);
  }

  submitAll(data) {
    console.log("inside submit all api call", data);
    return this.client.post(`${this.resourceUrl}/cabreview/approved`, data);
  }

  get(filter) {
    //console.log('cabRevSum api hit.............')
    return [
      {
        id: "first",
        downloaded: true,
        number: "M2032",
        title: "Whole Genome and Whole Exome Sequencing",
        checkedOut: true,
        status: "Approved with Changes",
        finalComments: "This is final comment",
        doctors: [
          {
            name: "Dr.Hamil",
            decision: "Approved with change",
            comments:
              "We'll have to address these large panels and WES as they relate to oncology as a seperate policy A",
          },
          {
            name: "Dr.Ruben",
            decision: "Approved with change",
            comments:
              "whole genome/exome shouldbe for undiagnosed rare germline disorders",
          },
          {
            name: "Dr.Hamil",
            decision: "Approved with change",
            comments:
              "We'll have to address these large panels and WES as they relate to oncology as a seperate policy A",
          },
          {
            name: "Dr.Ruben",
            decision: "Approved with change",
            comments:
              "whole genome/exome shouldbe for undiagnosed rare germline disorders",
          },
        ],
        currentCoverageCriteria: `<li>
          Concerning suspected cases of rickettsial diseases (see signs and
          symptoms below), including Rocky Mountain spotted fever, Rickettsia
          parkeri rickettsiosis, Rickettsia species 364D rickettsiosis, Rickettsia
          spp (mild spotted fever), and R. akari (rickettsialpox):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>
              Indirect immunofluorescence antibody (IFA) assay for IgG antibodies
            </li>
            <li>A limit of two units of IFA assay meets coverage criteria.</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>Standard blood culture; OR</li>
            <li>Nucleic acid amplification testing (NAAT), including PCR; OR</li>
            <li>IFA assay for IgM antibodies</li>
          </ol>
          <li>
            Typical signs and symptoms of rickettsial diseases usually begin 3 –
            12 days after initial bite and can include (Biggs et al., 2016):
          </li>
          <ol>
            <li>Fever</li>
            <li>Headache</li>
            <li>Chills</li>
            <li>Malaise</li>
            <li>Myalgia</li>
            <li>Nausea</li>
            <li>Vomiting</li>
            <li>Abdominal pain</li>
            <li>Photophobia</li>
            <li>Anorexia</li>
            <li>Skin rash</li>
            <li>
              Ulcerative lesion with regional lymphadenopathy (for Rickettsia
              species 364D rickettsiosis)
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of ehrlichiosis and/or anaplasmosis (see
          signs and symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>NAAT, including PCR, of whole blood; AND</li>
            <li>
              Indirect immunofluorescence antibody (IFA) assay for IgG antibodies;
              AND
            </li>
            <li>Microscopy for morulae detection</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA assay for IgM antibodies; OR</li>
            <li>Standard blood culture</li>
          </ol>
          <li>
            Typical signs and symptoms of ehrlichiosis and/or anaplasmosis usually
            begin 5-14 days after an infected tick bite, and they include (Biggs
            et al., 2016):
          </li>
          <ol>
            <li>Fever</li>
            <li>Headache</li>
            <li>Malaise</li>
            <li>Myalgia</li>
            <li>Shaking chills</li>
            <li>
              Gastrointestinal issues, including nausea, vomiting, and diarrhea,
              in ehrlichiosis
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of tick-borne relapsing fever (TBRF) caused
          by Borrelia hermsii, B. parkerii, B. mazzottii, or B. turicatae (see
          signs and symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Dark-field microscopy of peripheral blood smear; OR</li>
            <li>Microscopy of Wright- or Giemsa-stained blood smear; OR</li>
            <li>PCR testing</li>
            <li>
              Indirect immunofluorescence antibody (IFA) for IgG for Borrelia
            </li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA assay for IgM for Borrelia; OR</li>
            <li>Culture testing for Borrelia</li>
          </ol>
          <li>Typical signs and symptoms include (CDC, 2018d):</li>
          <ol>
            <li>
              Recurring febrile episodes that last approximately 3 days separated
              by approximately 7 days
            </li>
            <li>
              Nonspecific symptoms that occur in at least 50% of cases include
              headache, myalgia, chills, nausea, arthralgia, and vomiting
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of babesiosis (see signs and symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Giemsa- or Wright-stain of blood smear; OR</li>
            <li>NAAT, including PCR</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA assay for either Babesia IgG or IgM</li>
          </ol>
          <li>
            Typical signs and symptoms of babesiosis can include (CDC, 2019a):
          </li>
          <ol>
            <li>Hemolytic anemia</li>
            <li>Splenomegaly</li>
            <li>Hepatomegaly</li>
            <li>Jaundice</li>
            <li>
              Nonspecific flu-like symptoms such as fever, chills, body aches,
              weakness, and fatigue
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of malaria (see signs and symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>
              Smear microscopy to diagnose malaria, determine the species of
              Plasmodium, identify the parasitic life-cycle stage, and/or quantify
              the parasitemia
            </li>
            <li>Rapid immunochromatographic diagnostic test</li>
            <li>NAAT, including PCR</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA for Plasmodium antibodies</li>
          </ol>
          <li>
            Typical signs and symptoms of malaria can include (Arguin & Tan,
            2019):
          </li>
          <ol>
            <li>Fever</li>
            <li>
              Influenza-like symptoms such as chills, headache, body aches, and so
              on
            </li>
            <li>Anemia</li>
            <li>Jaundice</li>
            <li>Seizures</li>
            <li>Mental confusion</li>
            <li>Kidney failure</li>
            <li>Acute respiratory distress syndrome</li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of chikungunya virus (see signs and symptoms
          below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Viral culture for diagnosis; OR</li>
            <li>
              NAAT, including PCR, for presence of chikungunya in serum sample; OR
            </li>
            <li>
              Indirect immunofluorescence antibody (IFA) assay for IgM antibodies
              during both the acute and convalescent phases
            </li>
          </ol>
          <li>
            Typical signs and symptoms of chikungunya include (Staples, Hills, &
            Powers, 2020):
          </li>
          <ol>
            <li>High fever (>102?F or 39?C)</li>
            <li>
              Joint pains (usually multiple joints, bilateral, and symmetric)
            </li>
            <li>Headache</li>
            <li>Myalgia</li>
            <li>Arthritis</li>
            <li>Conjunctivitis</li>
            <li>Nausea</li>
            <li>Vomiting</li>
            <li>Maculopapular rash</li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of West Nile Virus (WNV) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>
              IFA for WNV-specific IgM or IgG antibodies in either serum or CSF;
              AND
            </li>
            <li>Plaque reduction neutralization test for WNV</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>NAAT, including PCR, for WNV</li>
          </ol>
          <li>Typical signs and symptoms of WNV include (Nasci et al., 2013):</li>
          <ol>
            <li>Headache</li>
            <li>Myalgia</li>
            <li>Arthralgia</li>
            <li>Gastrointestinal symptoms</li>
            <li>Maculopapular rash</li>
            <li>
              Less than 1% develop neuroinvasive WNV with symptoms of meningitis,
              encephalitis, or acute flaccid paralysis
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of Yellow Fever Virus (YFV) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Plaque reduction neutralization test for YFV; AND</li>
            <li>NAAT, including PCR, for YFV; AND</li>
            <li>
              Serologic assays to detect virus-specific IgM and IgG antibodies
            </li>
          </ol>
          <li>
            Typical signs and symptoms of yellow fever include (Gershman &
            Staples, 2019):
          </li>
          <ol>
            <li>
              Nonspecific influenza like syndrome including fever, chills,
              headache, backache, myalgia, prostration, nausea, and vomiting in
              initial illness
            </li>
            <li>
              Toxic form of disease symptoms includes jaundice, hemorrhagic
              symptoms, and multisystem organ failure
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of Dengue virus (DENV) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Plaque reduction neutralization test for DENV; AND</li>
            <li>NAAT, including PCR, for DENV; OR</li>
            <li>IgM antibody capture ELISA (MAC-ELISA); OR</li>
            <li>NS1 ELISA</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IgG-ELISA</li>
            <li>Hemagglutination testing</li>
          </ol>
          <li>Typical signs and symptoms of dengue can include (CDC, 2021e):</li>
          <ol>
            <li>Fever</li>
            <li>Headache</li>
            <li>Retro-orbital eye pain</li>
            <li>Myalgia</li>
            <li>Arthralgia</li>
            <li>Erythematous maculopapular rash</li>
            <li>Petechiae</li>
            <li>Leukopenia</li>
            <li>Nausea and/or vomiting</li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of Colorado Tick Fever (CTF) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Virus-specific IFA-stained blood smears; OR</li>
            <li>IFA for CTF-specific antibodies</li>
          </ol>
          <li>Typical signs and symptoms of CTF can include (CDC, 2021b):</li>
          <ol>
            <li>Fever</li>
            <li>Chills</li>
            <li>Headache</li>
            <li>Myalgia</li>
            <li>Malaise</li>
            <li>Sore throat</li>
            <li>Vomiting</li>
            <li>Abdominal Pain</li>
            <li>Maculopapular or petechial rash</li>
          </ol>
        </ol>
        <li>
          Note: For Lyme disease and testing for Borrelia burgdorferi, please see
          AHS-G2143 Lyme Disease. For Zika virus testing, please see AHS-G2133
          Zika Virus Risk Assessment.
        </li>
        </ol>`,
        proposedCoverageCriteria: `<ol>
        <li>
          <strong>Concerning suspected cases of rickettsial diseases (see signs and
          symptoms below). Here's a random line of text. <u>including Rocky Mountain spotted fever</u>, Rickettsia
          parkeri rickettsiosis, Rickettsia species 364D rickettsiosis, Rickettsia
          spp (mild spotted fever), and and V. Laxman:</strong>
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ul>
            <li>
              <i>Indirect immunofluorescence antibody (IFA) assay for IgG antibodies</i>
            </li>
            <li>A limit of two units of IFA assay meets coverage criteria.</li>
            <li>Let's add a new point to this list</li>
            <li><b>This line will be bold in view</b></li>
          </ul>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>Nucleic acid amplification testing (NAAT), including PCR; OR</li>
            <li>IFA assay for IgM antibodies</li>
          </ol>
          <li>
            Typical signs and symptoms of rickettsial diseases usually begin 3 –
            12 days after initial bite and can include (Biggs et al., 2016):
          </li>
          <ol>
            <li>Fever</li>
            <li>Headache</li>
            <li>Chills</li>
            <li>Malaise</li>
            <li>Myalgia</li>
            <li>Nausea</li>
            <li>Some</li>
            <li>Random</li>
            <li>Disease</li>
            <li>Names Here</li>
            <li>Vomiting</li>
            <li>Abdominal pain</li>
            <li>Photophobia</li>
           
            <li>Skin rash</li>
            <li>
              Ulcerative lesion with regional lymphadenopathy (for Rickettsia
              species 364D rickettsiosis)
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of ehrlichiosis and/or anaplasmosis (see
          signs and symptoms below):
        </li>
        <ul>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>NAAT, including PCR, of whole blood; AND</li>
            <li>
              Indirect immunofluorescence antibody (IFA) assay for IgG antibodies;
              AND
            </li>
            <li>Microscopy for morulae detection</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA assay for IgM antibodies; OR</li>
            <li>Standard blood culture</li>
          </ol>
          <li>
            Typical signs and symptoms of ehrlichiosis and/or anaplasmosis usually
            begin 5-14 days after an infected tick bite, and they include (Biggs
            et al., 2016):
          </li>
          <ol>
            <li>Fever</li>
            <li>Headache</li>
            <li>Malaise</li>
            <li>Some</li>
            <li>Random</li>
            <li>Disease</li>
            <li>Names Here</li>
            <li>Myalgia</li>
            <li>Shaking chills</li>
            <li>
              Gastrointestinal issues, including nausea, vomiting, and diarrhea,
              in ehrlichiosis
            </li>
          </ol>
        </ul>
        <li>
          Concerning suspected cases of tick-borne relapsing fever (TBRF) caused
          by Borrelia hermsii, B. parkerii, B. mazzottii, or B. turicatae (see
          signs and symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Dark-field microscopy of peripheral blood smear; OR</li>
            <li>Microscopy of Wright- or Giemsa-stained blood smear; OR</li>
            <li>PCR testing</li>
            <li>
              Indirect immunofluorescence antibody (IFA) for IgG for Borrelia
            </li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA assay for IgM for Borrelia; OR</li>
            <li>Culture testing for Borrelia</li>
          </ol>
          <li>Typical signs and symptoms include (CDC, 2018d):</li>
          <ol>
            <li>
              Recurring febrile episodes that last approximately 3 days separated
              by approximately 7 days
            </li>
            <li>
              Nonspecific symptoms that occur in at least 50% of cases include
              headache, myalgia, chills, nausea, arthralgia, and vomiting
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of babesiosis (see signs and symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Giemsa- or Wright-stain of blood smear; OR</li>
            <li>NAAT, including PCR</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA assay for either Babesia IgG or IgM</li>
          </ol>
          <li>
            Typical signs and symptoms of babesiosis can include (CDC, 2019a):
          </li>
          <ol>
            <li>Hemolytic anemia</li>
            <li>Splenomegaly</li>
            <li>Hepatomegaly</li>
            <li>Jaundice</li>
            <li>
              Nonspecific flu-like symptoms such as fever, chills, body aches,
              weakness, and fatigue
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of malaria (see signs and symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>
              Smear microscopy to diagnose malaria, determine the species of
              Plasmodium, identify the parasitic life-cycle stage, and/or quantify
              the parasitemia
            </li>
            <li>Rapid immunochromatographic diagnostic test</li>
            <li>NAAT, including PCR</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA for Plasmodium antibodies</li>
          </ol>
          <li>
            Typical signs and symptoms of malaria can include (Arguin & Tan,
            2019):
          </li>
          <ol>
            <li>Fever</li>
            <li>
              Influenza-like symptoms such as chills, headache, body aches, and so
              on
            </li>
            <li>Anemia</li>
            <li>Jaundice</li>
            <li>Seizures</li>
            <li>Mental confusion</li>
            <li>Kidney failure</li>
            <li>Acute respiratory distress syndrome</li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of chikungunya virus (see signs and symptoms
          below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Viral culture for diagnosis; OR</li>
            <li>
              NAAT, including PCR, for presence of chikungunya in serum sample; OR
            </li>
            <li>
              Indirect immunofluorescence antibody (IFA) assay for IgM antibodies
              during both the acute and convalescent phases
            </li>
          </ol>
          <li>
            Typical signs and symptoms of chikungunya include (Staples, Hills, &
            Powers, 2020):
          </li>
          <ol>
            <li>High fever (>102?F or 39?C)</li>
            <li>
              Joint pains (usually multiple joints, bilateral, and symmetric)
            </li>
            <li>Headache</li>
            <li>Myalgia</li>
            <li>Arthritis</li>
            <li>Conjunctivitis</li>
            <li>Nausea</li>
            <li>Vomiting</li>
            <li>Maculopapular rash</li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of West Nile Virus (WNV) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>
              IFA for WNV-specific IgM or IgG antibodies in either serum or CSF;
              AND
            </li>
            <li>Plaque reduction neutralization test for WNV</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>NAAT, including PCR, for WNV</li>
          </ol>
          <li>Typical signs and symptoms of WNV include (Nasci et al., 2013):</li>
          <ol>
            <li>Headache</li>
            <li>Myalgia</li>
            <li>Arthralgia</li>
            <li>Gastrointestinal symptoms</li>
            <li>Maculopapular rash</li>
            <li>
              Less than 1% develop neuroinvasive WNV with symptoms of meningitis,
              encephalitis, or acute flaccid paralysis
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of Yellow Fever Virus (YFV) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Plaque reduction neutralization test for YFV; AND</li>
            <li>NAAT, including PCR, for YFV; AND</li>
            <li>
              Serologic assays to detect virus-specific IgM and IgG antibodies
            </li>
          </ol>
          <li>
            Typical signs and symptoms of yellow fever include (Gershman &
            Staples, 2019):
          </li>
          <ol>
            <li>
              Nonspecific influenza like syndrome including fever, chills,
              headache, backache, myalgia, prostration, nausea, and vomiting in
              initial illness
            </li>
            <li>
              Toxic form of disease symptoms includes jaundice, hemorrhagic
              symptoms, and multisystem organ failure
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of Dengue virus (DENV) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Plaque reduction neutralization test for DENV; AND</li>
            <li>NAAT, including PCR, for DENV; OR</li>
            <li>IgM antibody capture ELISA (MAC-ELISA); OR</li>
            <li>NS1 ELISA</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IgG-ELISA</li>
            <li>Hemagglutination testing</li>
          </ol>
          <li>Typical signs and symptoms of dengue can include (CDC, 2021e):</li>
          <ol>
            <li>Fever</li>
            <li>Headache</li>
            <li>Retro-orbital eye pain</li>
            <li>Myalgia</li>
            <li>Arthralgia</li>
            <li>Erythematous maculopapular rash</li>
            <li>Petechiae</li>
            <li>Leukopenia</li>
            <li>Nausea and/or vomiting</li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of Colorado Tick Fever (CTF) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Virus-specific IFA-stained blood smears; OR</li>
            <li>IFA for CTF-specific antibodies</li>
          </ol>
          <li>Typical signs and symptoms of CTF can include (CDC, 2021b):</li>
          <ol>
            <li>Fever</li>
            <li>Chills</li>
            <li>Headache</li>
            <li>Myalgia</li>
            <li>Malaise</li>
            <li>Sore throat</li>
            
            <li>Abdominal Pain</li>
            <li>Appendix Pain</li>
        
            <li>Maculopapular or petechial rash</li>
          </ol>
        </ol>
        <li>
          Note: For Lyme disease and testing for Borrelia burgdorferi, please see
          AHS-G2143 Lyme Disease. For Zika virus testing, please see AHS-G2133
          Zika Virus Risk Assessment.
        </li>
        </ol>`,
      },
      {
        id: "second",
        number: "M2032",
        title: "Whole Genome and Whole Exome Sequencing",
        checkedOut: false,
        status: "Approved with Changes",
        finalComments: "This is final comment",
        doctors: [
          {
            name: "Dr.Hamil",
            decision: "Approved with change",
            comments:
              "We'll have to address these large panels and WES as they relate to oncology as a seperate policy A",
          },
          {
            name: "Dr.Ruben",
            decision: "Approved with change",
            comments:
              "whole genome/exome shouldbe for undiagnosed rare germline disorders",
          },
          {
            name: "Dr.Hamil",
            decision: "Approved with change",
            comments:
              "We'll have to address these large panels and WES as they relate to oncology as a seperate policy A",
          },
          {
            name: "Dr.Ruben",
            decision: "Approved with change",
            comments:
              "whole genome/exome shouldbe for undiagnosed rare germline disorders",
          },
        ],
        currentCoverageCriteria: `<li>
          Concerning suspected cases of rickettsial diseases (see signs and
          symptoms below), including Rocky Mountain spotted fever, Rickettsia
          parkeri rickettsiosis, Rickettsia species 364D rickettsiosis, Rickettsia
          spp (mild spotted fever), and R. akari (rickettsialpox):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>
              Indirect immunofluorescence antibody (IFA) assay for IgG antibodies
            </li>
            <li>A limit of two units of IFA assay meets coverage criteria.</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>Standard blood culture; OR</li>
            <li>Nucleic acid amplification testing (NAAT), including PCR; OR</li>
            <li>IFA assay for IgM antibodies</li>
          </ol>
          <li>
            Typical signs and symptoms of rickettsial diseases usually begin 3 –
            12 days after initial bite and can include (Biggs et al., 2016):
          </li>
          <ol>
            <li>Fever</li>
            <li>Headache</li>
            <li>Chills</li>
            <li>Malaise</li>
            <li>Myalgia</li>
            <li>Nausea</li>
            <li>Vomiting</li>
            <li>Abdominal pain</li>
            <li>Photophobia</li>
            <li>Anorexia</li>
            <li>Skin rash</li>
            <li>
              Ulcerative lesion with regional lymphadenopathy (for Rickettsia
              species 364D rickettsiosis)
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of ehrlichiosis and/or anaplasmosis (see
          signs and symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>NAAT, including PCR, of whole blood; AND</li>
            <li>
              Indirect immunofluorescence antibody (IFA) assay for IgG antibodies;
              AND
            </li>
            <li>Microscopy for morulae detection</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA assay for IgM antibodies; OR</li>
            <li>Standard blood culture</li>
          </ol>
          <li>
            Typical signs and symptoms of ehrlichiosis and/or anaplasmosis usually
            begin 5-14 days after an infected tick bite, and they include (Biggs
            et al., 2016):
          </li>
          <ol>
            <li>Fever</li>
            <li>Headache</li>
            <li>Malaise</li>
            <li>Myalgia</li>
            <li>Shaking chills</li>
            <li>
              Gastrointestinal issues, including nausea, vomiting, and diarrhea,
              in ehrlichiosis
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of tick-borne relapsing fever (TBRF) caused
          by Borrelia hermsii, B. parkerii, B. mazzottii, or B. turicatae (see
          signs and symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Dark-field microscopy of peripheral blood smear; OR</li>
            <li>Microscopy of Wright- or Giemsa-stained blood smear; OR</li>
            <li>PCR testing</li>
            <li>
              Indirect immunofluorescence antibody (IFA) for IgG for Borrelia
            </li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA assay for IgM for Borrelia; OR</li>
            <li>Culture testing for Borrelia</li>
          </ol>
          <li>Typical signs and symptoms include (CDC, 2018d):</li>
          <ol>
            <li>
              Recurring febrile episodes that last approximately 3 days separated
              by approximately 7 days
            </li>
            <li>
              Nonspecific symptoms that occur in at least 50% of cases include
              headache, myalgia, chills, nausea, arthralgia, and vomiting
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of babesiosis (see signs and symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Giemsa- or Wright-stain of blood smear; OR</li>
            <li>NAAT, including PCR</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA assay for either Babesia IgG or IgM</li>
          </ol>
          <li>
            Typical signs and symptoms of babesiosis can include (CDC, 2019a):
          </li>
          <ol>
            <li>Hemolytic anemia</li>
            <li>Splenomegaly</li>
            <li>Hepatomegaly</li>
            <li>Jaundice</li>
            <li>
              Nonspecific flu-like symptoms such as fever, chills, body aches,
              weakness, and fatigue
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of malaria (see signs and symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>
              Smear microscopy to diagnose malaria, determine the species of
              Plasmodium, identify the parasitic life-cycle stage, and/or quantify
              the parasitemia
            </li>
            <li>Rapid immunochromatographic diagnostic test</li>
            <li>NAAT, including PCR</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA for Plasmodium antibodies</li>
          </ol>
          <li>
            Typical signs and symptoms of malaria can include (Arguin & Tan,
            2019):
          </li>
          <ol>
            <li>Fever</li>
            <li>
              Influenza-like symptoms such as chills, headache, body aches, and so
              on
            </li>
            <li>Anemia</li>
            <li>Jaundice</li>
            <li>Seizures</li>
            <li>Mental confusion</li>
            <li>Kidney failure</li>
            <li>Acute respiratory distress syndrome</li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of chikungunya virus (see signs and symptoms
          below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Viral culture for diagnosis; OR</li>
            <li>
              NAAT, including PCR, for presence of chikungunya in serum sample; OR
            </li>
            <li>
              Indirect immunofluorescence antibody (IFA) assay for IgM antibodies
              during both the acute and convalescent phases
            </li>
          </ol>
          <li>
            Typical signs and symptoms of chikungunya include (Staples, Hills, &
            Powers, 2020):
          </li>
          <ol>
            <li>High fever (>102?F or 39?C)</li>
            <li>
              Joint pains (usually multiple joints, bilateral, and symmetric)
            </li>
            <li>Headache</li>
            <li>Myalgia</li>
            <li>Arthritis</li>
            <li>Conjunctivitis</li>
            <li>Nausea</li>
            <li>Vomiting</li>
            <li>Maculopapular rash</li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of West Nile Virus (WNV) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>
              IFA for WNV-specific IgM or IgG antibodies in either serum or CSF;
              AND
            </li>
            <li>Plaque reduction neutralization test for WNV</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>NAAT, including PCR, for WNV</li>
          </ol>
          <li>Typical signs and symptoms of WNV include (Nasci et al., 2013):</li>
          <ol>
            <li>Headache</li>
            <li>Myalgia</li>
            <li>Arthralgia</li>
            <li>Gastrointestinal symptoms</li>
            <li>Maculopapular rash</li>
            <li>
              Less than 1% develop neuroinvasive WNV with symptoms of meningitis,
              encephalitis, or acute flaccid paralysis
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of Yellow Fever Virus (YFV) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Plaque reduction neutralization test for YFV; AND</li>
            <li>NAAT, including PCR, for YFV; AND</li>
            <li>
              Serologic assays to detect virus-specific IgM and IgG antibodies
            </li>
          </ol>
          <li>
            Typical signs and symptoms of yellow fever include (Gershman &
            Staples, 2019):
          </li>
          <ol>
            <li>
              Nonspecific influenza like syndrome including fever, chills,
              headache, backache, myalgia, prostration, nausea, and vomiting in
              initial illness
            </li>
            <li>
              Toxic form of disease symptoms includes jaundice, hemorrhagic
              symptoms, and multisystem organ failure
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of Dengue virus (DENV) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Plaque reduction neutralization test for DENV; AND</li>
            <li>NAAT, including PCR, for DENV; OR</li>
            <li>IgM antibody capture ELISA (MAC-ELISA); OR</li>
            <li>NS1 ELISA</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IgG-ELISA</li>
            <li>Hemagglutination testing</li>
          </ol>
          <li>Typical signs and symptoms of dengue can include (CDC, 2021e):</li>
          <ol>
            <li>Fever</li>
            <li>Headache</li>
            <li>Retro-orbital eye pain</li>
            <li>Myalgia</li>
            <li>Arthralgia</li>
            <li>Erythematous maculopapular rash</li>
            <li>Petechiae</li>
            <li>Leukopenia</li>
            <li>Nausea and/or vomiting</li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of Colorado Tick Fever (CTF) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Virus-specific IFA-stained blood smears; OR</li>
            <li>IFA for CTF-specific antibodies</li>
          </ol>
          <li>Typical signs and symptoms of CTF can include (CDC, 2021b):</li>
          <ol>
            <li>Fever</li>
            <li>Chills</li>
            <li>Headache</li>
            <li>Myalgia</li>
            <li>Malaise</li>
            <li>Sore throat</li>
            <li>Vomiting</li>
            <li>Abdominal Pain</li>
            <li>Maculopapular or petechial rash</li>
          </ol>
        </ol>
        <li>
          Note: For Lyme disease and testing for Borrelia burgdorferi, please see
          AHS-G2143 Lyme Disease. For Zika virus testing, please see AHS-G2133
          Zika Virus Risk Assessment.
        </li>
        </ol>`,
        proposedCoverageCriteria: `<ol>
        <li>
          <strong>Concerning suspected cases of rickettsial diseases (see signs and
          symptoms below). Here's a random line of text. <u>including Rocky Mountain spotted fever</u>, Rickettsia
          parkeri rickettsiosis, Rickettsia species 364D rickettsiosis, Rickettsia
          spp (mild spotted fever), and and V. Laxman:</strong>
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ul>
            <li>
              <i>Indirect immunofluorescence antibody (IFA) assay for IgG antibodies</i>
            </li>
            <li>A limit of two units of IFA assay meets coverage criteria.</li>
            <li>Let's add a new point to this list</li>
            <li><b>This line will be bold in view</b></li>
          </ul>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>Nucleic acid amplification testing (NAAT), including PCR; OR</li>
            <li>IFA assay for IgM antibodies</li>
          </ol>
          <li>
            Typical signs and symptoms of rickettsial diseases usually begin 3 –
            12 days after initial bite and can include (Biggs et al., 2016):
          </li>
          <ol>
            <li>Fever</li>
            <li>Headache</li>
            <li>Chills</li>
            <li>Malaise</li>
            <li>Myalgia</li>
            <li>Nausea</li>
            <li>Some</li>
            <li>Random</li>
            <li>Disease</li>
            <li>Names Here</li>
            <li>Vomiting</li>
            <li>Abdominal pain</li>
            <li>Photophobia</li>
           
            <li>Skin rash</li>
            <li>
              Ulcerative lesion with regional lymphadenopathy (for Rickettsia
              species 364D rickettsiosis)
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of ehrlichiosis and/or anaplasmosis (see
          signs and symptoms below):
        </li>
        <ul>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>NAAT, including PCR, of whole blood; AND</li>
            <li>
              Indirect immunofluorescence antibody (IFA) assay for IgG antibodies;
              AND
            </li>
            <li>Microscopy for morulae detection</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA assay for IgM antibodies; OR</li>
            <li>Standard blood culture</li>
          </ol>
          <li>
            Typical signs and symptoms of ehrlichiosis and/or anaplasmosis usually
            begin 5-14 days after an infected tick bite, and they include (Biggs
            et al., 2016):
          </li>
          <ol>
            <li>Fever</li>
            <li>Headache</li>
            <li>Malaise</li>
            <li>Some</li>
            <li>Random</li>
            <li>Disease</li>
            <li>Names Here</li>
            <li>Myalgia</li>
            <li>Shaking chills</li>
            <li>
              Gastrointestinal issues, including nausea, vomiting, and diarrhea,
              in ehrlichiosis
            </li>
          </ol>
        </ul>
        <li>
          Concerning suspected cases of tick-borne relapsing fever (TBRF) caused
          by Borrelia hermsii, B. parkerii, B. mazzottii, or B. turicatae (see
          signs and symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Dark-field microscopy of peripheral blood smear; OR</li>
            <li>Microscopy of Wright- or Giemsa-stained blood smear; OR</li>
            <li>PCR testing</li>
            <li>
              Indirect immunofluorescence antibody (IFA) for IgG for Borrelia
            </li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA assay for IgM for Borrelia; OR</li>
            <li>Culture testing for Borrelia</li>
          </ol>
          <li>Typical signs and symptoms include (CDC, 2018d):</li>
          <ol>
            <li>
              Recurring febrile episodes that last approximately 3 days separated
              by approximately 7 days
            </li>
            <li>
              Nonspecific symptoms that occur in at least 50% of cases include
              headache, myalgia, chills, nausea, arthralgia, and vomiting
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of babesiosis (see signs and symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Giemsa- or Wright-stain of blood smear; OR</li>
            <li>NAAT, including PCR</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA assay for either Babesia IgG or IgM</li>
          </ol>
          <li>
            Typical signs and symptoms of babesiosis can include (CDC, 2019a):
          </li>
          <ol>
            <li>Hemolytic anemia</li>
            <li>Splenomegaly</li>
            <li>Hepatomegaly</li>
            <li>Jaundice</li>
            <li>
              Nonspecific flu-like symptoms such as fever, chills, body aches,
              weakness, and fatigue
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of malaria (see signs and symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>
              Smear microscopy to diagnose malaria, determine the species of
              Plasmodium, identify the parasitic life-cycle stage, and/or quantify
              the parasitemia
            </li>
            <li>Rapid immunochromatographic diagnostic test</li>
            <li>NAAT, including PCR</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IFA for Plasmodium antibodies</li>
          </ol>
          <li>
            Typical signs and symptoms of malaria can include (Arguin & Tan,
            2019):
          </li>
          <ol>
            <li>Fever</li>
            <li>
              Influenza-like symptoms such as chills, headache, body aches, and so
              on
            </li>
            <li>Anemia</li>
            <li>Jaundice</li>
            <li>Seizures</li>
            <li>Mental confusion</li>
            <li>Kidney failure</li>
            <li>Acute respiratory distress syndrome</li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of chikungunya virus (see signs and symptoms
          below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Viral culture for diagnosis; OR</li>
            <li>
              NAAT, including PCR, for presence of chikungunya in serum sample; OR
            </li>
            <li>
              Indirect immunofluorescence antibody (IFA) assay for IgM antibodies
              during both the acute and convalescent phases
            </li>
          </ol>
          <li>
            Typical signs and symptoms of chikungunya include (Staples, Hills, &
            Powers, 2020):
          </li>
          <ol>
            <li>High fever (>102?F or 39?C)</li>
            <li>
              Joint pains (usually multiple joints, bilateral, and symmetric)
            </li>
            <li>Headache</li>
            <li>Myalgia</li>
            <li>Arthritis</li>
            <li>Conjunctivitis</li>
            <li>Nausea</li>
            <li>Vomiting</li>
            <li>Maculopapular rash</li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of West Nile Virus (WNV) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>
              IFA for WNV-specific IgM or IgG antibodies in either serum or CSF;
              AND
            </li>
            <li>Plaque reduction neutralization test for WNV</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>NAAT, including PCR, for WNV</li>
          </ol>
          <li>Typical signs and symptoms of WNV include (Nasci et al., 2013):</li>
          <ol>
            <li>Headache</li>
            <li>Myalgia</li>
            <li>Arthralgia</li>
            <li>Gastrointestinal symptoms</li>
            <li>Maculopapular rash</li>
            <li>
              Less than 1% develop neuroinvasive WNV with symptoms of meningitis,
              encephalitis, or acute flaccid paralysis
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of Yellow Fever Virus (YFV) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Plaque reduction neutralization test for YFV; AND</li>
            <li>NAAT, including PCR, for YFV; AND</li>
            <li>
              Serologic assays to detect virus-specific IgM and IgG antibodies
            </li>
          </ol>
          <li>
            Typical signs and symptoms of yellow fever include (Gershman &
            Staples, 2019):
          </li>
          <ol>
            <li>
              Nonspecific influenza like syndrome including fever, chills,
              headache, backache, myalgia, prostration, nausea, and vomiting in
              initial illness
            </li>
            <li>
              Toxic form of disease symptoms includes jaundice, hemorrhagic
              symptoms, and multisystem organ failure
            </li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of Dengue virus (DENV) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Plaque reduction neutralization test for DENV; AND</li>
            <li>NAAT, including PCR, for DENV; OR</li>
            <li>IgM antibody capture ELISA (MAC-ELISA); OR</li>
            <li>NS1 ELISA</li>
          </ol>
          <li>The following DOES NOT MEET COVERAGE CRITERIA:</li>
          <ol>
            <li>IgG-ELISA</li>
            <li>Hemagglutination testing</li>
          </ol>
          <li>Typical signs and symptoms of dengue can include (CDC, 2021e):</li>
          <ol>
            <li>Fever</li>
            <li>Headache</li>
            <li>Retro-orbital eye pain</li>
            <li>Myalgia</li>
            <li>Arthralgia</li>
            <li>Erythematous maculopapular rash</li>
            <li>Petechiae</li>
            <li>Leukopenia</li>
            <li>Nausea and/or vomiting</li>
          </ol>
        </ol>
        <li>
          Concerning suspected cases of Colorado Tick Fever (CTF) (see signs and
          symptoms below):
        </li>
        <ol>
          <li>The following MEETS COVERAGE CRITERIA:</li>
          <ol>
            <li>Virus-specific IFA-stained blood smears; OR</li>
            <li>IFA for CTF-specific antibodies</li>
          </ol>
          <li>Typical signs and symptoms of CTF can include (CDC, 2021b):</li>
          <ol>
            <li>Fever</li>
            <li>Chills</li>
            <li>Headache</li>
            <li>Myalgia</li>
            <li>Malaise</li>
            <li>Sore throat</li>
            
            <li>Abdominal Pain</li>
            <li>Appendix Pain</li>
        
            <li>Maculopapular or petechial rash</li>
          </ol>
        </ol>
        <li>
          Note: For Lyme disease and testing for Borrelia burgdorferi, please see
          AHS-G2143 Lyme Disease. For Zika virus testing, please see AHS-G2133
          Zika Virus Risk Assessment.
        </li>
        </ol>`,
      },
      {
        id: "third",
        number: "M2032",
        title: "Whole Genome and Whole Exome Sequencing",
        checkedOut: false,
        status: "Approved with Changes",
        finalComments: "This is final comment",
        doctors: [
          {
            name: "Dr.Hamil",
            decision: "Approved with change",
            comments:
              "We'll have to address these large panels and WES as they relate to oncology as a seperate policy A",
          },
          {
            name: "Dr.Ruben",
            decision: "Approved with change",
            comments:
              "whole genome/exome shouldbe for undiagnosed rare germline disorders",
          },
          {
            name: "Dr.Hamil",
            decision: "Approved with change",
            comments:
              "We'll have to address these large panels and WES as they relate to oncology as a seperate policy A",
          },
          {
            name: "Dr.Ruben",
            decision: "Approved with change",
            comments:
              "whole genome/exome shouldbe for undiagnosed rare germline disorders",
          },
        ],
      },
      {
        id: "fourth",
        number: "M2032",
        title: "Whole Genome and Whole Exome Sequencing",
        checkedOut: false,
        status: "Auto-Approved",
        finalComments: "This is final comment",
        doctors: [
          {
            name: "Dr.Hamil",
            decision: "Approved with change",
            comments:
              "We'll have to address these large panels and WES as they relate to oncology as a seperate policy A",
          },
          {
            name: "Dr.Ruben",
            decision: "Approved with change",
            comments:
              "whole genome/exome shouldbe for undiagnosed rare germline disorders",
          },
          {
            name: "Dr.Hamil",
            decision: "Approved with change",
            comments:
              "We'll have to address these large panels and WES as they relate to oncology as a seperate policy A",
          },
          {
            name: "Dr.Ruben",
            decision: "Approved with change",
            comments:
              "whole genome/exome shouldbe for undiagnosed rare germline disorders",
          },
        ],
      },
      {
        id: "fifth",
        number: "M2032",
        title: "Whole Genome and Whole Exome Sequencing",
        checkedOut: false,
        status: "Auto-Approved",
        finalComments: "This is final comment",
        doctors: [
          {
            name: "Dr.Hamil",
            decision: "Approved with change",
            comments:
              "We'll have to address these large panels and WES as they relate to oncology as a seperate policy A",
          },
          {
            name: "Dr.Ruben",
            decision: "Approved with change",
            comments:
              "whole genome/exome shouldbe for undiagnosed rare germline disorders",
          },
          {
            name: "Dr.Hamil",
            decision: "Approved with change",
            comments:
              "We'll have to address these large panels and WES as they relate to oncology as a seperate policy A",
          },
          {
            name: "Dr.Ruben",
            decision: "Approved with change",
            comments:
              "whole genome/exome shouldbe for undiagnosed rare germline disorders",
          },
        ],
      },
    ];
  }

  getCC(cabReviewKey, cabReviewAssignmentKey) {
    return this.client.get(
      `${this.resourceUrl}/cabreview/${cabReviewKey}/cabreviewassignment/${cabReviewAssignmentKey}/summary/coveragecriteria`
    );
  }

  assign(data, type) {
    return this.client.post(
      `${this.resourceUrl}/cabreview${
        type === apiConstants.doctor_approved ? "/approved" : "/discussed"
      }`,
      data
    );
  }

  // update(data) {
  //   return this.client.put(`${this.resourceUrl}/cabreview/discussed`, data);
  // }

  // create(data) {
  //   return this.client.post(`${this.resourceUrl}/cabreview/discussed`, data);
  // }
}
