<template>
  <q-layout class="rounded-borders">
    <div class="demoThree">
      <demoOneHeader
        :className="' demo-three__header '"
        :buttonName="'Request To Attend'"
      ></demoOneHeader>
      <!--end navbar responsive -->

      <!--start caver -->
      <div class="banner">
        <div class="container">
          <div class="row row-banner">
            <div class="col-lg-12">
              <h2>
                Anuual tech <br />conference {{ new Date().getFullYear() }}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <!--end caver -->
      <!--start Register -->
      <div class="Register">
        <div class="container">
          <div class="row register-col">
            <div class="col-lg-6 col-md-8 register-conference">
              <div class="col-md-12">
                <div class="row">
                  <div
                    class="col-lg-12 col-md-12 col-sm-12 col-xs-12 register-header"
                  >
                    <h4>
                      Register Your Coming At Anuual Tech Conference
                      {{ new Date().getFullYear() }}
                    </h4>
                  </div>

                  <div
                    class="col-lg-12 col-md-12 col-xs-12 register-information"
                  >
                    <div class="row">
                      <div class="col-md-12 col-sm-12">
                        <div class="row row-data-time">
                          <div
                            class="col-lg-6 col-md-6 col-sm-6 col-xs-12 child-data-time"
                          >
                            <div class="location-data">
                              <div class="data">
                                <img
                                  src="../../../../assets/images/Vector.png"
                                />
                                <span class="text"
                                  >27 June, 8:00AM | 28 June, 9:30 PM</span
                                >
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div class="parent-data">
                              <div class="data">
                                <img
                                  src="../../../../assets/images/location-svgrepo-com1.png"
                                />
                                <span class="text"
                                  >Grand Conference Hallst 11341 Cairo,
                                  Egypt</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-4 text-center btn-Request">
              <q-btn color="base-blue1" label="Request to Attend" />
            </div>
          </div>
        </div>
      </div>
      <!--end Register -->
      <!--start  conference -->
      <div class="conference">
        <div class="container">
          <div class="text-center header-conference">
            <h4>
              Welcome to the
              <span
                >Anuual Tech <br />Conference
                {{ new Date().getFullYear() }}</span
              >
            </h4>
          </div>
          <div class="row-conference">
            <div class="row">
              <div class="col-lg-6 col-md-5 col-sm-5 col-xs-12 image-card">
                <div class="image-size">
                  <img
                    src="https://pentagoet.com/wp-content/uploads/2018/05/homepage-rooms-callout-350x420.jpg"
                  />
                </div>
              </div>
              <div
                class="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-conference col-conference"
              >
                <p>
                  Egypt has recently launched an initiative "Digital Egypt
                  Offshoring Industry Vision 2022-2026" joining this match
                  making event will allow you to get first-hand information
                  about the benefits you will enjoy if you decide to invest in
                  Egypt. A full scale national electronics strategy is adapted
                  to promote both the design & Manufacturing sides of the
                  industry. MCIT is currently immersed in establishing the
                  "Electronics innovation Hub" within the Knowledge city located
                  in the top-notch New administrative capital of Egypt.
                  Recently, ITIDA reached an agreement with the "Global
                  Semiconductors Alliance" to establish an Egyptian chapter,
                  GSA-Egypt under the umbrella of EiTESAL. The fast-growing
                  semiconductor Egytian industry will be spreading and
                  integrated with the worldwide technology. EiTESAL members will
                  be active members in the GSA and Dr. Haddara & Eng. Mohamed
                  Mohsen, EiTESAL board members will attend the global
                  convention in Munich to launch the chapter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end conference -->
      <!--start event speaker -->
      <div class="event-speaker">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-event text-center">
                <h4>Event Speakers</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end event speaker -->
      <!-- start member speaker-->

      <div class="member-speaker">
        <div class="container">
          <div class="row row-speaker">
            <div class="col-lg-3 col-md-3 col-sm-6 col-speaker">
              <div class="card-speakers">
                <div class="img-card text-center">
                  <img src="../../../../assets/images/Image@3x.png" />
                </div>

                <div class="title-card">
                  <h5>
                    Nancy Orbien<br />
                    <span>Chairman, EiTESAL</span>
                  </h5>
                </div>
                <div class="text-card">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div class="social-media">
                  <img src="../../../../assets/images/Group11_3.png" />

                  <img src="../../../../assets/images/Group12_6.png" />

                  <img src="../../../../assets/images/Group13_4.png" />
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-speaker">
              <div class="card-speakers">
                <div class="img-card text-center">
                  <img src="../../../../assets/images/Image@3x.png" />
                </div>

                <div class="title-card">
                  <h5>
                    Nancy Orbien<br />
                    <span>Chairman, EiTESAL</span>
                  </h5>
                </div>
                <div class="text-card">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div class="social-media">
                  <img src="../../../../assets/images/Group11_3.png" />

                  <img src="../../../../assets/images/Group12_6.png" />

                  <img src="../../../../assets/images/Group13_4.png" />
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-speaker">
              <div class="card-speakers">
                <div class="img-card text-center">
                  <img src="../../../../assets/images/Image@3x.png" />
                </div>

                <div class="title-card">
                  <h5>
                    Nancy Orbien<br />
                    <span>Chairman, EiTESAL</span>
                  </h5>
                </div>
                <div class="text-card">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div class="social-media">
                  <img src="../../../../assets/images/Group11_3.png" />

                  <img src="../../../../assets/images/Group12_6.png" />

                  <img src="../../../../assets/images/Group13_4.png" />
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-speaker">
              <div class="card-speakers">
                <div class="img-card text-center">
                  <img src="../../../../assets/images/Image@3x.png" />
                </div>

                <div class="title-card">
                  <h5>
                    Nancy Orbien<br />
                    <span>Chairman, EiTESAL</span>
                  </h5>
                </div>
                <div class="text-card">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div class="social-media">
                  <img src="../../../../assets/images/Group11_3.png" />

                  <img src="../../../../assets/images/Group12_6.png" />

                  <img src="../../../../assets/images/Group13_4.png" />
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-speaker">
              <div class="card-speakers">
                <div class="img-card text-center">
                  <img src="../../../../assets/images/Image@3x.png" />
                </div>

                <div class="title-card">
                  <h5>
                    Nancy Orbien<br />
                    <span>Chairman, EiTESAL</span>
                  </h5>
                </div>
                <div class="text-card">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div class="social-media">
                  <img src="../../../../assets/images/Group11_3.png" />

                  <img src="../../../../assets/images/Group12_6.png" />

                  <img src="../../../../assets/images/Group13_4.png" />
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-speaker">
              <div class="card-speakers">
                <div class="img-card text-center">
                  <img src="../../../../assets/images/Image@3x.png" />
                </div>

                <div class="title-card">
                  <h5>
                    Nancy Orbien<br />
                    <span>Chairman, EiTESAL</span>
                  </h5>
                </div>
                <div class="text-card">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div class="social-media">
                  <img src="../../../../assets/images/Group11_3.png" />

                  <img src="../../../../assets/images/Group12_6.png" />

                  <img src="../../../../assets/images/Group13_4.png" />
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-speaker">
              <div class="card-speakers">
                <div class="img-card text-center">
                  <img src="../../../../assets/images/Image@3x.png" />
                </div>

                <div class="title-card">
                  <h5>
                    Nancy Orbien<br />
                    <span>Chairman, EiTESAL</span>
                  </h5>
                </div>
                <div class="text-card">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div class="social-media">
                  <img src="../../../../assets/images/Group11_3.png" />

                  <img src="../../../../assets/images/Group12_6.png" />

                  <img src="../../../../assets/images/Group13_4.png" />
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-speaker">
              <div class="card-speakers">
                <div class="img-card text-center">
                  <img src="../../../../assets/images/Image@3x.png" />
                </div>

                <div class="title-card">
                  <h5>
                    Nancy Orbien<br />
                    <span>Chairman, EiTESAL</span>
                  </h5>
                </div>
                <div class="text-card">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div class="social-media">
                  <img src="../../../../assets/images/Group11_3.png" />

                  <img src="../../../../assets/images/Group12_6.png" />

                  <img src="../../../../assets/images/Group13_4.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- end member speaker-->
      <!--start Schedule  -->

      <div class="schedule">
        <div class="container">
          <div class="all-row-schedule">
            <div class="col-lg-12 title-schedule text-center">
              <h4>Schedule at a Glance</h4>
            </div>
            <div class="row">
              <div
                class="col-lg-1 col-md-1 col-xs-12 col-sm-12 perent-btn-schedule"
              >
                <div class="btn-schedule">
                  <div class="time-schedule">
                    : Sun June 27 {{ new Date().getFullYear() }}
                  </div>
                  <div class="data-schedule">Day</div>
                </div>
              </div>

              <div class="hover col-lg-1 col-md-1 col-xs-12"></div>
              <div class="col-lg-10 col-md-10 col-date">
                <div class="row row-schedule">
                  <div class="col-lg-4 col-md-4 col-sm-6 col-schedule">
                    <div class="hall-contact">Hall 5 connecta</div>
                    <div class="hall-time">09:30 AM - 10:30 AM</div>
                    <div class="hall-developer">
                      Developer Programming Seminar
                    </div>
                    <div class="parent-name-job">
                      <div class="name-job">
                        <div class="hall-name">Miriam Middleton</div>
                        <div class="hall-job">Cofounder, CEO</div>
                      </div>
                    </div>
                    <hr />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-6 col-schedule">
                    <div class="hall-contact">Hall 5 connecta</div>
                    <div class="hall-time">09:30 AM - 10:30 AM</div>
                    <div class="hall-developer">
                      Developer Programming Seminar
                    </div>
                    <div class="parent-name-job">
                      <div class="name-job">
                        <div class="hall-name">Miriam Middleton</div>
                        <div class="hall-job">Cofounder, CEO</div>
                      </div>
                    </div>
                    <hr />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-6 col-schedule">
                    <div class="hall-contact">Hall 5 connecta</div>
                    <div class="hall-time">09:30 AM - 10:30 AM</div>
                    <div class="hall-developer">
                      Developer Programming Seminar
                    </div>
                    <div class="parent-name-job">
                      <div class="name-job">
                        <div class="hall-name">Miriam Middleton</div>
                        <div class="hall-job">Cofounder, CEO</div>
                      </div>
                    </div>
                    <hr />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-6 col-schedule">
                    <div class="hall-contact">Hall 5 connecta</div>
                    <div class="hall-time">09:30 AM - 10:30 AM</div>
                    <div class="hall-developer">
                      Developer Programming Seminar
                    </div>
                    <div class="parent-name-job">
                      <div class="name-job">
                        <div class="hall-name">Miriam Middleton</div>
                        <div class="hall-job">Cofounder, CEO</div>
                      </div>
                    </div>
                    <hr />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-6 col-schedule">
                    <div class="hall-contact">Hall 5 connecta</div>
                    <div class="hall-time">09:30 AM - 10:30 AM</div>
                    <div class="hall-developer">
                      Developer Programming Seminar
                    </div>
                    <div class="parent-name-job">
                      <div class="name-job">
                        <div class="hall-name">Miriam Middleton</div>
                        <div class="hall-job">Cofounder, CEO</div>
                      </div>
                    </div>
                    <hr />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-6 col-schedule">
                    <div class="hall-contact">Hall 5 connecta</div>
                    <div class="hall-time">09:30 AM - 10:30 AM</div>
                    <div class="hall-developer">
                      Developer Programming Seminar
                    </div>
                    <div class="parent-name-job">
                      <div class="name-job">
                        <div class="hall-name">Miriam Middleton</div>
                        <div class="hall-job">Cofounder, CEO</div>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--end Schedule  -->
      <!--start Sponsors & Partners -->

      <div class="Sponsors">
        <div class="container">
          <div class="col-md-12 text-center header-sponsors">
            <h3>Sponsors & Partners</h3>
          </div>
          <div>
            <div class="col-md-12 text-center header-Platinum">
              <p>Platinum Sponsor</p>
            </div>
            <div class="row">
              <div class="col-md-3 col-sm-6 col-xs-12 card">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
              <div class="col-md-3 col-sm-6 col-xs-12 card">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
              <div class="col-md-3 col-sm-6 col-xs-12 card">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
              <div class="col-md-3 col-sm-6 col-xs-12 card">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
            </div>
          </div>
          <div>
            <div class="col-md-12 text-center header-Platinum">
              <p>Gold Sponsors</p>
            </div>
            <div class="row">
              <div class="col-md-3 col-sm-6 col-xs-12 card">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
              <div class="col-md-3 col-sm-6 col-xs-12 card">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
              <div class="col-md-3 col-sm-6 col-xs-12 card">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
              <div class="col-md-3 col-sm-6 col-xs-12 card">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
            </div>
          </div>
          <div>
            <div class="col-md-12 text-center header-Platinum">
              <p>Silver Sponsors</p>
            </div>
            <div class="row">
              <div class="col-md-3 col-sm-6 col-xs-12 card">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
              <div class="col-md-3 col-sm-6 col-xs-12 card">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
              <div class="col-md-3 col-sm-6 col-xs-12 card">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
              <div class="col-md-3 col-sm-6 col-xs-12 card">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
            </div>
          </div>

          <div class="col-md-12 text-center header-Platinum">
            <h5>Exhibitors</h5>
          </div>
          <div class="row">
            <div class="col-md-3 col-sm-6 col-xs-12 card">
              <img src="../../../../assets/images/Image@3x.png" />
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12 card">
              <img src="../../../../assets/images/Image@3x.png" />
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12 card">
              <img src="../../../../assets/images/Image@3x.png" />
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12 card">
              <img src="../../../../assets/images/Image@3x.png" />
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12 card">
              <img src="../../../../assets/images/Image@3x.png" />
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12 card">
              <img src="../../../../assets/images/Image@3x.png" />
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12 card">
              <img src="../../../../assets/images/Image@3x.png" />
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12 card">
              <img src="../../../../assets/images/Image@3x.png" />
            </div>
          </div>
        </div>
      </div>

      <!--end Sponsors & Partners -->
      <!--start news -->
      <div class="news">
        <div class="container">
          <h3 class="text-center news-title">News</h3>
          <div class="apis">
            <div>
              <div class="image-news">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
              <div class="text-news">
                <div class="title">
                  <h5>Developer Programming Seminar</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been the
                    industry's standard
                  </p>
                  <p>6 hours ago</p>
                </div>
              </div>
            </div>
            <div>
              <div class="image-news">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
              <div class="text-news">
                <div class="title">
                  <h5>Developer Programming Seminar</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been the
                    industry's standard
                  </p>
                  <p>6 hours ago</p>
                </div>
              </div>
            </div>
            <div>
              <div class="image-news">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
              <div class="text-news">
                <div class="title">
                  <h5>Developer Programming Seminar</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been the
                    industry's standard
                  </p>
                  <p>6 hours ago</p>
                </div>
              </div>
            </div>
            <div>
              <div class="image-news">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
              <div class="text-news">
                <div class="title">
                  <h5>Developer Programming Seminar</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been the
                    industry's standard
                  </p>
                  <p>6 hours ago</p>
                </div>
              </div>
            </div>
            <div>
              <div class="image-news">
                <img
                  src="../../../../assets/images/software_engineer.jpeg-900x510.jpg"
                />
              </div>
              <div class="text-news">
                <div class="title">
                  <h5>Developer Programming Seminar</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been the
                    industry's standard
                  </p>
                  <p>6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
      <!--end news -->
      <!--start join Us  -->
      <div class="joinUs">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <h5>Join us on June 27</h5>
              <p>We look forward to hosting you!</p>
              <div class="btn-Request">
                <q-btn color="base-white" label="Request to Attend" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end join Us  -->
      <!--start footer -->
      <div class="footer">
        <div class="container">
          <div class="row row-footer">
            <div class="col-lg-12 col-md-12 text-center">
              <p>
                © {{ new Date().getFullYear() }}. All Rights Reserved.<br />
                Event website powered by IPMagiX
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--end footer -->
    </div>
  </q-layout>
</template>
<script>
import demoOneHeader from "../../components/topHeader.vue";
export default {
  components: {
    demoOneHeader,
  },

  setup() {
    return {};
  },
};
</script>
