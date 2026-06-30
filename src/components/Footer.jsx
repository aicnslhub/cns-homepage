const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`w-full border-t text-[9px] md:text-[10px] py-8 mt-36 ${isDarkMode ? 'border-gray-900 bg-gray-950/20 text-gray-500' : 'border-gray-200 bg-gray-100 text-gray-600'}`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>© {new Date().getFullYear()} AI CNS Corp. All rights reserved. Securely and safely powered by Amazon Web Services Cloud Infrastructure.</div>
        <div className="flex space-x-4 whitespace-nowrap">
          <a href="https://coderix.co.kr/" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition">Reference Design: Coderix</a>
          <span>|</span>
          <span className="cursor-pointer hover:underline">Privacy & Data Protection Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;