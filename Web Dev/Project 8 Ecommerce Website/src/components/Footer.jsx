const Footer = () => {
  return (
    <footer id="contact" className="bg-white text-gray-600 w-full py-10 px-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Company</h2>
          <ul className="space-y-2">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Legal</h2>
          <ul className="space-y-2">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Security</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
          <ul className="space-y-2">
            <li><a href="#">Cool Stuff</a></li>
            <li><a href="#">API Access</a></li>
            <li><a href="#">Integrations</a></li>
            <li><a href="#">Beta Program</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
          <ul className="space-y-2">
            <li><a href="#">Docs</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Guides</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Newsletter</h2>
          <p className="text-sm mb-4">Subscribe to get the latest updates and offers.</p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition cursor-pointer">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      <div className="text-center text-xs text-gray-400 mt-10 border-t pt-6">
        &copy; {new Date().getFullYear()} BrandName. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
