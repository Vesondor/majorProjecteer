import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import { ClockCircleOutlined, PhoneOutlined } from "@ant-design/icons";

const Contact = async () => {
  const data: RegularPage = getListPage("contact/_index.md");
  const { frontmatter } = data;
  const { title, description, meta_title, image } = frontmatter;
  const { contact_form_action } = config.params;

  // Placeholders for Google location, phone number, and opening hours
  const googleLocation = "https://maps.app.goo.gl/ttnFgnAQdsqmyWM47"; // Add Google location here
  const phoneNumber = "092 575 854"; // Add phone number here
  const openingHours = "Monday - Saturday, 8:00 AM to 6:00 PM"; // Add opening hours here

  return (
    <>
      <Header />
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">
              <form action={contact_form_action} method="POST">
                <div className="mb-6">
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Name"
                    type="text"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="example@email.com"
                    type="email"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="form-label">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input"
                    placeholder="Inquire more information"
                    rows={8}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-6 mt-5 mt-md-0">
            <div className="flex items-center mb-4">
              <PhoneOutlined className="text-3xl mr-3 text-primary" />
              <div>
                <h4 className="text-lg font-bold">Phone Number</h4>
                <p className="text-sm"> {phoneNumber}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-5 mt-md-0">
            <div className="flex items-center mb-4">
              <ClockCircleOutlined className="text-3xl mr-3 text-primary" />
              <div>
                <h4 className="text-lg font-bold">Opening Hours</h4>
                <p className="text-sm">{openingHours}</p>
              </div>
            </div>
          </div>
          {/* Google Location, Phone Number, and Opening Hours */}
          <div className="row mt-6">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15635.03089234128!2d104.9173108!3d11.5692183!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109517aad6679ab%3A0xba3f76e4fd7a4914!2sLimkokwing%20University!5e0!3m2!1sen!2skh!4v1713972201206!5m2!1sen!2skh" width="600" height="450" style={{ "border": "0" }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
