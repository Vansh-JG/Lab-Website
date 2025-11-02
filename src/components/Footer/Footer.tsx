import { FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="mt-5 border-t border-gray-300 pt-2 pb-6 text-center text-sm text-gray-500">
            {/* Twitter Icon */}
            <a
                href="https://twitter.com/shveng1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mb-3 text-gray-600 hover:text-black transition"
            >
                <FaTwitter size={24} />
            </a>

            {/* Copyright */}
            <p>© Venugopal Lab {new Date().getFullYear()}</p>
        </footer>
    );
};

export default Footer;
