import React from 'react'
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';

const ContactLinks = () => {
  return (
    <div className="w-full bg-gray-100 py-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Brand</h2>
        <ul className="flex gap-6 text-xl text-gray-700">
          <li>
            <a href="https://instagram.com/ayush.1.9" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-pink-500 transition" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-blue-500 transition" />
            </a>
          </li>
          <li>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-blue-600 transition" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ContactLinks