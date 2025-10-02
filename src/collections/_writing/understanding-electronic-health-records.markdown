---
title:  "The Electronic Health Records Ecosystem is Complicated. Sorting It Out is Key to Building Great Experiences"
subhead: "Lessons from designing and building a breakthrough electronic medical record search aggregator"
imageAlt: Screenshot of MIB Electronic Medical Records Portal
layout: blog_entry
pageType: blog_entry
project: MIB-EHR was a legacy company's entry into the fast-growing field of electronic medical records for life insurance companies. It delivered records from multiple vendors, cut weeks off delivery times and hugely reduced costs. I designed, built and delivered a simple, perfomant front end and wrote extensive documentation.
image: maze
urllink: https://cantina.co/the-electronic-health-records-ecosystem-is-complicated-sorting-it-out-is-key-to-building-great-experiences/
sequence: 3  
---
Each person’s access to their own health records simply should be a right — easy, open, unfettered access. So why hasn’t anyone — you know — gone and done it?

After all, it’s mostly electronic these days. Tens of millions of records generated during doctor visits reside in digital format, and pretty much everyone has a computer or phone that could access them. So health records should be as easily available as 401K records, or bank statements.

One would think.

Some have tried. [Apple’s Health app][1] for iOS provides access. Sorta. A quick search of Boston-area health organizations in the app results in seven providers. They’re all huge, so that swath covers a sizable cohort of potential users — but not all. Not me. My doctor is nowhere to be found.

I can get my records through my doctor’s app. (Which is a terrible app. But that’s another story.) But I can’t get all my records everywhere, in one place and cross-compare them. I can’t see trends. I can’t see the whole “me.”

This is not an atypical situation. It’s pretty much the problem looking for a solution these days. The simple idea of “Google for Health Records” doesn’t really exist and has considerable roadblocks for anyone looking to build it.

If Apple hasn’t done it, who will? 

## Why is it so difficult?

Companies often approach health records with idealistic goals: efficiency, democratization, empowerment, transparency. Apple and its Health app, for instance. Success would reduce cost and improve health outcomes at the same time.

Additionally, Electronic Health Records, or EHRs, promise convenience, universality, and immediacy of vital information to doctors. Health and life insurers base decisions on them. Anonymized records promise a vast trove of data for clinical testing, drug development, policy-makers, governments, and the like.

Companies with the best intentions often quickly hit a wall of reality while working in this space – tech limitations, a fractured ecosystem, latencies, and other complicating difficulties in dealing with electronic health records.

With so much potential, what’s the holdup? No simple explanation exists. But three major reasons are a good place to start.

### The records are everywhere

Like Homer Simpson finding out that Frogurt is free — but is also [cursed][2] — medical records sound like an easy win until digging into the details.

Electronic medical records are not so much an ecosystem, as a series of information deposits to be mined. So getting a person’s entire medical history is not so simple as going to a single source. That history might actually reside within the systems of multiple companies and record exchanges or even doctors’ offices. And those records are, in reality, a collection of multiple data files and documents.

The overview is roughly this:

*  More than a dozen companies compete in the commercial EHR space. The two biggest, [Cerner][3] and [Epic][4], together command over half of that market. A glass-half-full approach sees 60 percent of records with only two major players. But the bad news is another 40 percent of may be held in any of these other dozen or so vendors.
*  Records can also be obtained through Health Information Exchanges — 15 state-level [organizations][5] that serve as a conduit for records for an individual state — sorta. Not all records in a state are included, and records from neighboring states might also be found there. For instance, [UHIN][6], the exchange for Utah, [contains][7] 95 percent of the hospitals and 90 percent of large clinics in the state, but also contains data sources in Idaho, Wyoming, Nevada, Montana, Colorado, and California.
*  Additionally, the U.S. Department of Veterans Affairs — the VA — houses a vast trove of medical records for millions of people who have served in the military. 
* Records can also be found in physicians’ patient access portals, as well as digitized file archives predating conversion to EHR proprietary data formats.


In short, it’s a hugely fragmented market.

### Fragmentation vastly increases complexity

Because the market is so fragmented, designers and engineers will be bringing disparate sources together into some sort of a coherent, manageable structure. The problems are not just progress-slowing, and fit into two larger categories: issues with the provider and with the records themselves.
Each provider has its own way of doing things

Each EHR vendor plays by slightly different rules, has its own tech and handles requests for data and returns data in its own way. From a pure tech perspective this means unique implementations for each. Some of the issues this causes:

* The required demographic information to initiate a record request varies from vendor to vendor. All require key, core information about the user — name, address, social security, etc. It’s the other stuff. Some need email, others don’t. The required or available values for the “sex” field can vary. Others require doctors’ names and info.
* Document requirements can be vendor-specific or state specific. All users must sign at least one standard release form for records to be handed over. But some vendors require additional releases — special authorizations — to be completed only after a record is requested and located, effectively blocking immediate release. Others may require a user to sign into a portal to agree to release. Others must grant final permission via email before release.    
* Expect to wait. System latency varies widely. Some record requests are near-immediate. Others can take hours, days even, to provide just a response, then a few more to release a record. If additional releases must be signed, the wait can be anyone’s guess.
* What is returned varies. Health Records are in a standardized data format called CCD and CCD/A. It’s based on XML instead of the more widely used and flexible JSON, so well, there’s that. However, most vendors include data files and other differences that make handling and parsing outputs unique.

### Records may exist but be out of reach

Likewise, the records themselves, while robust, have their own limitations to be dealt with.

* Record requests may be time limited. An EHR from more than five years ago might not be released even if it is held in a vendor’s system.
* Record requests may be geographically limited to a set distance from the applicant’s address — 50 miles, for instance. In underserved rural areas, many people travel at least that far just to get basic services. Additionally, this limit might leave out records from a national healthcare destinations such as the Mayo Clinic, Johns Hopkins Hospital or the Cleveland Clinic.
* “Available” doesn’t mean available. The vendor might flag a record as available, but it’s still up to the healthcare organization to approve the release, which may or may not happen. 
* Abandonment rate. Releasing records can set off a flurry of forms to be signed, and all parties don’t always see it through to the end. 
* The data is segmented. Records use CCD or CCD-A format, and the data is consistently structured. But it’s spread across conceivably dozens of digital files. It doesn’t show patterns or trends. A treatment course — the valuable data — must be assembled from disparate encounters.

These issues can all be handled, but they also serve as impediments to progress.

Still, one large, complicated and costly topic still looms. And it never subsides: Information Security (Infosec).

### Infosec with records creates huge potential liabilities

During the Manhattan Project, a sphere of plutonium halved into hemispheres was produced. The halves were generally safe – as plutonium goes – unless the two were brought too close together. Researchers became inured to the danger, and [tiny errors][8] cost two men their lives from radiation. It became known as the [Demon Core][9].

Keeping a trove of medical records around can be a lot like that core — seemingly innocuous right up until it’s a serious problem that could kill your organization. In 2020, more than [10 million][10] people were affected by health record data breaches. Not every company would want to expose itself to potential problems on that scale.

Health Records are regulated under the Health Insurance Portability and Accountability Act of 1996 — [HIPAA][10]. It covers a lot of ground, but the applicable parts strictly limit access to personal health information unless the patient gives written consent for its release. Any material that is released must be tracked, handling processes must be in place, and anyone who handles material must undergo security training. Legalities weigh heavily on the process for all parties involved.

Getting into the business of medical records means assuming liability for what will be a tempting target for data thieves. It’s a huge responsibility. Setting legalities aside — perhaps because enforcement has been distressingly lax — these records are protected for a reason. Guarding them is a moral and ethical requirement. Losing them, a costly error.

Could sloppy handling kill someone like the Demon Core? Maybe, though unlikely. Could a data breach kill a company? Maybe not, but it could hurt for a while.

## How to approach the EHR space

All of this may come across with a certain air of hopelessness — it’s hard, so why even try?

If the technology was more up-to-date and the process was easier and the market wasn’t so fragmented … It would all work great if we weren’t in this situation.

The promise of EHR is simply too good to pass by. It’s still early enough in its growth for breakthroughs to be made using information gleaned from EHR. The great apps for enterprise and consumers are still being — or yet to be — built. This is a future that can be shaped.

Cantina’s experience with EHR has led to three major principles that we like to keep in mind when working in this space:

### You are a retailer. Act like one.

If you were to ask most folks “what does a grocery store sell?” the answer would be “Groceries — apples, meat, cheese, eggs, milk, etc.” This is true, but also not true. The actual product is “availability of groceries” — everything in one place. A shopper could buy direct from a dozen suppliers, but that would be hard.

Aggregators of EHR vendors are retailers. The business is the availability of records. But that doesn’t mean that it’s just a pipeline that takes documents in one end and dumps them out the other. Retailers add value. They also make a promise.

The most successful retailer globally, Amazon, can be defined many ways, but it’s mainly “Google for shopping.” Its stock is endless, but it will point you to exactly the right item and send it right to your door.

Likewise, those working in the EHR vendor space need to mirror this promise: Not just a connection to all records dumped out like letters to Santa in “Miracle on 34th Street.” But something meaningful — a connection to that one piece of data or that data trend among all the records that is needed to guide treatment, make a decision or show progress.

### Replace their process with your process

Vendors’ APIs are like industrial factories for handing over records. The process they present may be engineer friendly but not layperson friendly. Adding even more vendors with their own methods doesn’t scale for users.

Even if various vendors can’t agree on a single way of doing things, your team can. Vendors have enough commonalities to be abstracted into a single experience. Think of it as hiding complexity behind something simpler to understand.

Sell your brand and experience. Returning to the Amazon example, the user doesn’t need to know all of Amazon vendors’ invoicing policies and shipping schedules and customer service contacts. They need only know one: Amazon’s.

### Focus on users, not technology

It doesn’t matter how cool your tech is. It doesn’t matter how simple or elegant the app is.

The tech is not the product. The app is not the product. The records are. Or, more specifically, the knowledge a user can get from the records. All UX goals must center around what a user is actually trying to accomplish if they get a record.

An enterprise user in the healthcare or insurance industry may be searching for a single record of a healthcare encounter — or even a single section of a record. “Look how many pages we can send you” or “look how fast we are” might seem impressive, but blitzing a user with every available document actually blitzes them with irrelevant, duplicative information.

A consumer may have a different goal. They may want to see more of an overall picture of their health. They don’t want data volume as much as they want to be told a meaningful story. They want to see trends and information that allows them to make choices. A records dump doesn’t do that either.

In both of these instances, getting the records is the difficult part, but the value is more about what you do in the final inches of the journey.

## Next steps for EHR

So what lies ahead? EHR, despite its entrenchment in the healthcare industry, is still nascent among the general public. Shoddy or downright poor apps by major players — I’m looking at you MyChart — contribute to this lack of traction.

But, consider online banking. It’s pretty much a given that a bank will have a site and an app. However, quality varies greatly, as does what the user can accomplish. No one has “cracked” online banking or made it a single, unified “Platonic ideal” experience. But it’s still widely adopted, if not actually loved.

EHR is undoubtedly in all our futures. But it probably won’t be the magical future that digital access might suggest on first or even second glance. Unless, of course, we designers and technologists tackle the issues at hand and build that better future.

[1]: https://www.apple.com/ios/health/
[2]: https://www.youtube.com/watch?v=XlcFTbgoeBk
[3]: https://www.cerner.com/
[4]: https://www.epic.com/
[5]: https://en.wikipedia.org/wiki/Health_information_exchange#Individual_exchanges
[6]: https://uhin.org/
[7]: https://uhin.org/solutions/data-sources/
[8]: https://www.youtube.com/watch?v=AQ0P7R9CfCY
[9]: https://en.wikipedia.org/wiki/Demon_core
[10]: https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act