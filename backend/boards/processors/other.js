const processBoardPage = require("./core");

exports.processOther = (board, title, location, debug) => {
  return processBoardPage(
    board,
    board.url,
    title,
    location,
    [
      /*  https://www.hashicorp.com/jobs
            <i data-id="1817528" class="">
                <a href="/jobs/1817528">
                  <div class="content">
                    <div class="top">
                      <span><i class="pin"></i>Remote Australia</span>
                    </div>
                    <div class="title">Developer Advocate</div>
                  </div>
                </a>
              </li>
        */

      {
        jobSelector: "div#job-listings li",
        titleExtractor: el => el.find(".title").text(),
        locationExtractor: (el, $) => el.find(".pin").text(),
        linkExtractor: el =>
          board.url.substring(0, board.url.indexOf("/", 15)) +
          el.find("a").attr("href")
      },
      /*    https://www.sitepen.com/about/jobs.html
    <div class="card">
        <a class="wrapper" href="/about/jobs.html?position=fullstack-javascript-engineer">
            <div class="hasIcon greyTheme icon-code">
                <h3 class="title is-3">Fullstack Javascript Engineer</h3>
                <p>We're looking for an opinionated (yet flexible!) fullstack engineer who is up to the challenge of delivering end-to-end solutions for enterprise software!</p>
            </div>
        </a>
    </div>
      */
      {
        jobSelector: "div.card",
        titleExtractor: el => el.find("h3.title").text(),
        locationExtractor: (el, $) => "Remote United States US",
        linkExtractor: el =>
          board.url.substring(0, board.url.indexOf("/", 15)) +
          el.find("a").attr("href")
      },
      /*    https://www.voxnest.com/careers
            <div class="box_read_more">
                <h4 class="title title--blue">Fullstack Engineer</h4>
                <p class="paragraph paragraph--roman_blue paragraph--text">You will build, improve and maintain Spreaker website and API.</p>
                <p class="paragraph paragraph--roman_blue paragraph--link">
                    <a href="/careers/fullstack-engineer-php-nodejs">Read more</a>
                </p>
            </div>

      */
      {
        jobSelector: "div.box_read_more",
        titleExtractor: el => el.find("h4.title").text(),
        locationExtractor: (el, $) => "Remote",
        linkExtractor: el =>
          board.url.substring(0, board.url.indexOf("/", 15)) +
          el.find("a").attr("href")
      },

      /*    https://particular.net/careers
        <li><strong><a href="/careers/sales">Inside Sales &amp; Account Manager</a></strong></li>
      */
      {
        jobSelector: "div.careers ul li",
        titleExtractor: el => el.find("a").text(),
        locationExtractor: (el, $) => "Remote",
        linkExtractor: el =>
          board.url.substring(0, board.url.indexOf("/", 15)) +
          el.find("a").attr("href")
      },
      /*
        <a class="Link JobListing" href="/careers/python_data_engineer">
            <h5>
                <svg />
                    Python Data Engineer
            </h5>
            <div class="JobListing__badge">Remote</div>
            <div class="JobListing__bottom">More Info
                <svg />
            </div>
        </a>
       */
      {
        jobSelector: "div.JobListing__wrapper a",
        titleExtractor: el => el.find("h5").text(),
        locationExtractor: (el, $) => el.find("div.JobListing__badge").text(),
        linkExtractor: el =>
          board.url.substring(0, board.url.indexOf("/", 15)) + el.attr("href")
      },
      /*    https://marsbased.com/jobs/
      <div class="">
      <h2 class="h2">Senior Ruby on Rails Full-stack Developer / Remote position</h2>
      <p>We’re looking for a senior full-stack developer to join our Martian team, with strong knowledge of Ruby on Rails and JS frameworks such as Angular, React or Vue.</p>
      <p><a href="/jobs/senior-rails-full-stack-developer" class="btn-info btn-read-more" title="Read more">Read more</a></p>
    </div>
      */
      {
        jobSelector: "body.page-jobs div.text__section",
        titleExtractor: el => el.find("h2").text(),
        locationExtractor: (el, $) => "Remote",
        linkExtractor: el =>
          board.url.substring(0, board.url.indexOf("/", 15)) +
          el.find("a").attr("href")
      },
      /*    https://www.igalia.com/jobs/
        <article class="job job-teaser">
            <h4 class="title">
                <a class="link" href="/jobs/browsers_chromium_position" title="Browsers developer (Chromium focus)">
                Browsers developer (Chromium focus)
                </a>
            </h4>
            <div class="body">
                
                <p>At Igalia we are looking for a new developer to contribute to both the Chromium web browser and the Blink layout engine.</p>  
            </div>
        </article>
      */
      {
        jobSelector: "ul.jobs article.job h4",
        titleExtractor: el => el.find("a").text(),
        locationExtractor: (el, $) => "Remote",
        linkExtractor: el =>
          board.url.substring(0, board.url.indexOf("/", 15)) +
          el.find("a").attr("href")
      },
      /*    https://www.heroku.com/careers
        <li>
            <a href="/careers/infrastructure-engineer-heroku-data-10">Infrastructure Engineer, Heroku Data</a>
          </li>
      */
      {
        jobSelector: "div.job-categroy li",
        titleExtractor: el => el.find("a").text(),
        locationExtractor: (el, $) => "Remote",
        linkExtractor: el =>
          board.url.substring(0, board.url.indexOf("/", 15)) +
          el.find("a").attr("href")
      },
      /*    https://heap.io/careers/jobs
            <div data-department="Sales" data-location="London" class="single-job active">
                <div class="position-holder">
                    <p class="position">
                        <a href="https://heap.io/careers/job?gh_jid=1923604">Account Executive</a>
                    </p>
                </div>
                <div class="description">
                    <p>Sales</p>
                    <p class="city">London</p>
                    <a href="https://heap.io/careers/job?gh_jid=1923604">Apply Now</a>
                </div>
            </div>
      */
      {
        jobSelector: "div.jobs div.single-job",
        titleExtractor: el => el.find("p.position a").text(),
        locationExtractor: (el, $) => el.find("p.city").text(),
        linkExtractor: el => el.find("p.position a").attr("href")
      },
      /*    https://gradle.com/careers/
            <li>
                <a href="https://boards.greenhouse.io/gradle/jobs/85251" target="_blank" class="careers__job-link">
                Gradle Build Tool — Software Engineer</a>
                <div class="careers__job-location">Worldwide</div>
            </li>
      */
      {
        jobSelector: "ul.careers__jobs-list li",
        titleExtractor: el => el.find("a").text(),
        locationExtractor: (el, $) =>
          el.find("div.careers__job-location").text(),
        linkExtractor: el => el.find("a").attr("href")
      },
      /*    https://careers.ghost.org/
            <a href="https://careers.ghost.org/visual-designer/en" class="_2OQQU _30FkZ">
                <div class="_24c5B">
                    <p class="_2w1i5" style="color: rgb(36, 176, 238); font-family: &quot;Whitney SSm A&quot;, &quot;Whitney SSm B&quot;; font-weight: 500;">
                        Visual Designer
                    </p>
                    <div class="_38p08">
                        <p class="_2hW_E">Full-time</p>
                        <p class="_2hW_E">Remote</p>
                    </div>
                </div>
            </a>
      */
      {
        jobSelector: "div#vacancies div div div div a",
        titleExtractor: el => el.find("p").text(),
        locationExtractor: (el, $) => el.find("div p").text(),
        linkExtractor: el => el.attr("href")
      },
      /*    https://www.fairwinds.com/careers
            <div class="positions-card">
                <div class="position-title">
                    Site Reliability Engineer
                </div>
                <div class="position-description"> 
                    As a Site Reliability Engineer, your primary goal will be to ensure our client’s applications are available, fast, and secure. Our clients need the best service, support, and products, and...
                </div>
                <a href="careers/site-reliability-engineer?hsLang=en" class="button">
                Read more
                </a>
            </div>
      */
      {
        jobSelector: "div.positions-card",
        titleExtractor: el => el.find("div.position-title").text(),
        locationExtractor: (el, $) => "Remote",
        linkExtractor: el =>
          board.url.substring(0, board.url.indexOf("/", 15)) +
          el.find("a").attr("href")
      },
      /*    https://jobs.elastic.co/jobs/department/engineering
            <tr itemscope="" itemtype="http://schema.org/JobPosting">
                <td scope="col">
                    <a href="/jobs/ingest/distributed-emea-or-us-east-coast-/beats-senior-engineering-manager/1643651?lang=en_us " itemprop="title">
                    Beats - Senior Engineering Manager
                    </a>
                </td>
                <td scope="col" itemscope="" itemtype="http://schema.org/Postaladdress">
                    <span class="text-small float-right">
                        <small>
                            <i class="fa fa-map-marker"></i>
                            <a>Distributed, Global</a>
                        </small>
                    </span>	
                </td>
            </tr>

      */
      {
        jobSelector: "div#job-container table tr",
        titleExtractor: el => el.find("td a").text(),
        locationExtractor: (el, $) => el.find("td spav small").text(),
        linkExtractor: el =>
          board.url.substring(0, board.url.indexOf("/", 15)) +
          el.find("td a").attr("href")
      },
      /*    https://duckduckgo.com/hiring
            <div>
                <div id="resumator-job-job_20191018173123_FZXKFQB1L01VD8UH" class="resumator-job resumator-jobs-text">
                    <div class="resumator-job-title resumator-jobs-text">Technical Recruiter (Remote)</div>
                    <div class="resumator-job-info resumator-jobs-text">
                        <span class="resumator-job-location resumator-job-heading resumator-jobs-text">Location: </span>Paoli, PA
                    </div>                                     
                    <div id="resumator-job-info-details-job_20191018173123_FZXKFQB1L01VD8UH" class="resumator-job-info-details resumator-jobs-text">
                        <span class="resumator-job-type resumator-job-heading resumator-jobs-text">Type: </span>Full Time
                        <span class="resumator-job-experience resumator-job-heading resumator-jobs-text">Min.  Experience: </span>
                        <span class="resumator-job-experience-data">Experienced</span>                                     
                    </div>      
                    ...                               
                    <div id="resumator-job-desc-job_20191018173123_FZXKFQB1L01VD8UH" class="resumator-job-description resumator-jobs-text" style="display: none;">
                        <div class="resumator-job-description-text resumator-jobs-text">
                            ...
                            <a href="https://duckduckgo.applytojob.com/apply/UDzoZtNNX6" class="link dim ba ph3 pv2 b di br2 bg-ddg-blue white">Apply Now</a>                                                 </li>                                                 <li style="float:left;margin: 0 10px 0 0;padding:0;">
                            ...     
                    </div>                                 
                </div>
            </div>
      */
      {
        jobSelector: "div#resumator-wrapper div#resumator-jobs div",
        titleExtractor: el => el.find("div.resumator-job-title").text(),
        locationExtractor: (el, $) => el.find("div.resumator-job-info").text(),
        linkExtractor: el =>
          el.find("div.resumator-job-description a").attr("href")
      },
      /*    https://www.datadoghq.com/jobs-engineering/
            <a href="https://www.datadoghq.com/careers/detail/?gh_jid=1826124">
                <span class="title font-bold">Data Analyst - Internal Analytics Platform</span>
                <span class="loc">Paris</span>
            </a>
      */
      {
        jobSelector: "div#jobs ul li",
        titleExtractor: el => el.find("a span.title").text(),
        locationExtractor: (el, $) => el.find("a span.loc").text(),
        linkExtractor: el => el.find("a").attr("href")
      },
      /*    https://journey.buffer.com/
            <a href="https://journey.buffer.com/customer-advocate/en" class="_2OQQU _30FkZ">
                <div class="_24c5B">
                    <p class="_2w1i5" style="color: rgb(255, 155, 107); font-family: &quot;Open Sans&quot;, sans-serif; font-weight: 500;">
                        Customer Advocate
                    </p>
                    <div class="_38p08">
                        <p class="_2hW_E">Full-time</p>
                        <p class="_2hW_E">Remote</p>
                    </div>
                </div>
            </a>
       */
      {
        jobSelector: "div#job-list div div div div div a",
        titleExtractor: el => el.find("div p").text(),
        locationExtractor: (el, $) => el.find("div div p").text(),
        linkExtractor: el => el.attr("href")
      },
      /*    https://automattic.com/work-with-us/
            <li>
                <a href="https://automattic.com/work-with-us/software-engineer/" class="position-listing">
                    <div class="position-listing-info">
                        <div class="position-listing-title">Software Engineer</div>
                        <div class="position-listing-modifiers"></div>
                    </div>
                    <div class="position-listing-action">Apply</div>
                </a>
            </li>
      
      */
      {
        jobSelector: "h4#open-positions ul.position-listings-list li a",
        titleExtractor: el => el.find("div.position-listing-title").text(),
        locationExtractor: (el, $) => "Remote",
        linkExtractor: el => el.attr("href")
      },
      /*  https://www.aha.io/company/careers/current-openings
          <li data-location="United States,Canada,United Kingdom,Ireland,South Africa,Australia,New Zealand">
            <a href="/company/careers/current-openings/customer_success_specialist_product_marketing_us">
              <div class="job-list-title">
                <span>Customer Success Specialist <span>(product marketing experience required)</span></span>
              </div>
              <div class="job-list-location">
                Anywhere in the United States, Canada, the United Kingdom, 
                Ireland, South Africa, Australia, or New Zealand
              </div>
            </a>
          </li>
       */
      {
        jobSelector: "ul.job-list li a",
        titleExtractor: el => el.find("div.job-list-title").text(),
        locationExtractor: (el, $) => el.find("div.job-list-location").text(),
        linkExtractor: el =>
          board.url.substring(0, board.url.indexOf("/", 15)) + el.attr("href")
      },
      /*  https://stripe.com/jobs/search
          <li class="sc-EHOje ibgwSN">
            <div class="sc-bZQynM bCelqW">
              <a class="common-Link sc-bwzfXH dPudUq" href="/jobs/listing/account-associate/1487130">
                <div class="sc-bdVaJa hDQELU">Account Associate - Singapore</div>
              </a>
              <span class="sc-htpNat vYuBx common-BodyText">Sales</span>
              <div class="sc-ifAKCX hdwfUL">
                <div class="sc-bxivhb izpDGV common-FlagIcon common-FlagIcon--sg"></div>
                <span class=" common-BodyText">Singapore</span>
              </div>
            </div>
          </li>
      */
      {
        jobSelector: "ul.ToolListings div div ul li",
        titleExtractor: el => el.find("a div").text(),
        locationExtractor: (el, $) => el.find("div div span").text(),
        linkExtractor: el =>
          board.url.substring(0, board.url.indexOf("/", 15)) +
          el.find("a").attr("href")
      },
      /*  https://olo.theresumator.com/
          <li class="list-group-item">
            <h4 class="list-group-item-heading">
              <a href="http://olo.theresumator.com/apply/wK80srGENv/Account-Coordinator-Delivery-Specialist">
                Account Coordinator - Delivery Specialist                                    
              </a>
            </h4>
            <ul class="list-inline list-group-item-text">
              <li><i class="fa fa-map-marker"></i>New York or Remote, NY</li>
              <li><i class="fa fa-sitemap"></i>Customer Success</li>
            </ul>
          </li>
      */
      {
        jobSelector: "div.job-board-list div.jobs-list ul li.list-group-item",
        titleExtractor: el => el.find("h4 a").text(),
        locationExtractor: (el, $) => el.find("ul li .lifa-map-marker").text(),
        linkExtractor: el => el.find("h4 a").attr("href")
      }
    ],
    debug
  );
};
