import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div>
          <p className="eyebrow">Have a problem worth solving?</p>
          <Link href="/contact" className="footer-invitation">
            Let’s build
            <br />
            <span className="serif-emphasis">what’s next.</span>{" "}
            <ArrowUpRight />
          </Link>
        </div>
        <div className="footer-links">
          <a href="mailto:yashrana2402@gmail.com">
            Email <ArrowUpRight size={15} />
          </a>
          <a
            href="https://github.com/ranayash24"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/yash-rana-a5b4b9214/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <ArrowUpRight size={15} />
          </a>
          <a href="/resume.pdf" download>
            Download résumé <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Yash Rana</span>
        <span>Designed with intent. Built with curiosity.</span>
        <a href="#main-content">
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
