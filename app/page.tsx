import Waitlist from "@/components/Waitlist";

export default function Home() {
  return (
    <div className="pb-4">
      {/* Hero wordmark */}
      <div className="hero-wrap">
        <h1 className="hero">Croft</h1>
      </div>

      {/* Intro */}
      <div className="intro">
        <p className="lede">
          Croft is an artificial intelligence research and product company. We
          believe the intelligence people depend on should belong to them.
        </p>
        <p>
          As AI becomes woven into everyday life, the relationship between a
          person and their intelligence will become one of the most important
          relationships they have with technology. Yet today&rsquo;s systems are
          designed around platform incentives rather than individual ones. They
          forget context, reset relationships, and remain controlled by the
          companies that provide them. People are left with little ownership over
          the intelligence they rely on, and little ability to shape it around
          their own needs, values, and ambitions.
        </p>
        <p>
          We are building toward a different future: a personal intelligence
          that knows you, grows with you, and serves your goals over a lifetime.
        </p>
        <p>
          We are researchers, engineers, and builders. We have spent years at
          the frontier of AI.
        </p>
      </div>

      <section className="sec">
        <div>
          <span className="sec-num">01</span>
          <h2>Intelligence that belongs to you</h2>
        </div>
        <div className="sec-body">
          <p>
            The most intimate technology should answer to you. We believe
            ownership, alignment, and trust are not features but foundational
            requirements. The intelligence a person relies on should be shaped
            around their needs and values, and never subordinated to anyone
            else&rsquo;s incentives.
          </p>
          <p>
            <strong className="lead">Shaped around one person.</strong> Not a
            generic assistant shared by millions, but a trusted intelligence
            built around an individual — their context, their priorities, and
            the life they are trying to build.
          </p>
          <p>
            <strong className="lead">Continuous over a lifetime.</strong> It
            should hold continuity across years rather than sessions, growing
            more useful through experience instead of resetting with every
            conversation.
          </p>
        </div>
      </section>

      <section className="sec">
        <div>
          <span className="sec-num">02</span>
          <h2>What it takes to build</h2>
        </div>
        <div className="sec-body">
          <p>
            <strong className="lead">More than powerful models.</strong>{" "}
            Building this future takes systems that maintain continuity over time
            and run reliably in the background of everyday life — dependable,
            efficient, and private by default.
          </p>
          <p>
            <strong className="lead">Present wherever life happens.</strong>{" "}
            People do not live through text boxes. We see natural interaction
            through voice, vision, and language as essential to an intelligence
            that genuinely supports a life.
          </p>
        </div>
      </section>

      <section className="sec">
        <div>
          <span className="sec-num">03</span>
          <h2>How we work</h2>
        </div>
        <div className="sec-body">
          <p>
            <strong className="lead">Research and product are inseparable.</strong>{" "}
            We believe the strongest research comes from solving real problems
            for real people, and the best products are informed by deep
            technical understanding. Each sharpens the other.
          </p>
          <p>
            <strong className="lead">We measure what truly matters.</strong> We
            judge ourselves by the value we create in people&rsquo;s lives over
            time — not by attention, engagement, or metrics that happen to be
            easy to optimise.
          </p>
          <p>
            <strong className="lead">Built for the long term.</strong> We aim to
            build carefully and responsibly: technology that expands human
            capability while remaining firmly on the side of the individual.
          </p>
        </div>
      </section>

      <section className="sec">
        <div>
          <span className="sec-num">04</span>
          <h2>The relationship of the century</h2>
        </div>
        <div className="sec-body">
          <p>
            The relationship between a person and their intelligence may become
            one of the defining relationships of this century. We believe it
            should be personal, continuous, trustworthy, and ultimately belong
            to the person it serves.
          </p>
          <p>That is the future we are building at Croft.</p>
        </div>
      </section>

      <section className="sec" id="join-us">
        <div>
          <span className="sec-num">05</span>
          <h2>Join us</h2>
        </div>
        <div className="sec-body">
          <p>
            We&rsquo;re building AI that pushes technical boundaries while
            remaining unambiguously on the side of the person using it. Our team
            combines rigorous engineering with creative exploration, and
            we&rsquo;re looking for collaborators to help shape this vision.
          </p>
          <Waitlist />
        </div>
      </section>
    </div>
  );
}
