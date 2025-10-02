---
title:  "Bring Your Design Version Control Under Control"
subhead: "Abstract is the Holy Grail for Sketch users. So why is it so hard to understand?"
imageAlt: Screenshot of MIB Electronic Medical Records Portal
layout: blog_entry
pageType: blog_entry
project: MIB-EHR was a legacy company's entry into the fast-growing field of electronic medical records for life insurance companies. It delivered records from multiple vendors, cut weeks off delivery times and hugely reduced costs. I designed, built and delivered a simple, perfomant front end and wrote extensive documentation.
image: merge
sequence: 4  
urllink: https://cantina.co/bring-your-version-control-under-control/
---


Every designer at some point has had a file with a name like this on their hard drive.

<figure class="blog-image-insert">
    <img src="/siteart/abstract-file-name.jpg" alt="A Sketch file with the name homescreens-new-12/20/2019-updated-final-revised-final-final.sketch.">
</figure>


Search your feelings. You know it to be true. But it also is the sign of a real problem. Popular prototyping tools such as [Sketch][1] or Illustrator simply don’t scale across entire teams.

Designers had no real way of tracking progress on their work through subsequent versions. We generally resorted to file names and folders. Sharing files among designers was barely a step above sneakernet — Hey, could you Slack me that file?

And only one designer at a time could have a file open. Working in parallel often meant copying and pasting artboards from multiple Sketch files into one.

But these are actually all solved problems — for software developers. They’ve had [version control][2] for decades. Many options exist, but the most popular by far is [Git][3]. It allows multiple — hundreds or thousands, even — to work on the same codebase at the same time and then gracefully combine their work.

And Git is the model that [Abstract][4] is based on, even if it doesn’t work exactly the same. In short it is actual version control. It organizes files, keeps a trail of changes and who made them and allows multiple people to make changes to a project at the same time. It even helps sort out situations in which the same part of a file is changed.

It is the [Holy Grail][5]. So why do designers complain about it?

The answer, is partly, that most designers don’t use Git. They are not familiar with Git’s workflow model. I’m one of those weird designers who also writes code. I like to say I’m really great at Git — for a designer.

But for designers encountering the Git model for the first time, it’s bizarre.

## A few Git basics

I’m reminded of a Simpsons [episode][6] in which Bart’s classroom gets some grossly uncomfortable “Posturific” chairs. “I know they seem a little uncomfortable right now,” the teacher reassures the class, “but eventually your bones will change shape.”

Git — like those chairs — can be tough to adapt to. Developers can struggle with it. The name itself — Git — is British [slang][7] for “an unpleasant person.”

Entire books can and have been written about using Git. So I’ll be really general in describing Git. Remember, you just need to know enough to understand how Abstract works!

It’s helpful to think of Git as simply a Bag of Holding. Anyone working on the project can create a branch off the contents of the [Bag of Holding][8]. The user can now make changes without affecting the original Bag contents.

When changes are complete, they are committed to that branch. This branch can be merged into the Bag of Holding, which incorporates the changes — and only those changes — into the original’s contents. If another person makes changes on their own branch and that is added to the Bag of Holding, a user can pull those changes down into their own branch.

In plain English, changes made by any single user don’t affect the overall project code until changes are both committed and merged into the project. Git also keeps track of changes, who made them and even allows for reverting code even after it’s been added to a project. You can yoink a merge or even a commit right out.

The thing about Git is that its workflow is ill-defined at best. This gives Git great power, but is also means users have to take great responsibility. Otherwise, projects would become a free-for-all with code flying about sowing chaos. Developers have a whole host of unwritten rules and best practices to combat this — let’s call them the “Git Fresh Flow.”

## Applying Git to Abstract

Since Abstract’s basic workflow hews so closely to Git, designers would be wise to adopt the Git Fresh Flow best practices if they want to keep their version control under control. It’s helpful to think of them as almost a hedge against Git’s potential [shortcomings][9].

Abstract doesn’t offer the full Git experience, but an experience informed by Git offers many of its strengths, including:

* Allowing multiple people to work on the same project at once
* Keeping track of all changes and who made them
* Providing a single source of truth for projects
* Mitigating lost work
* Allowing easy reversion to earlier iterations

But like Git, Abstract works best with some basic rules in place. To to this end, I’ve boiled the Git best-practices workflow down to three basic rules for Abstract.

### Tip No. 1: Do not mess with Master

The Master branch is a principle adopted by Abstract from Git. This is the branch with final, approved versions of designs. It is the source of truth of whatever project a team is working on. It should only ever be delivery ready. It should never contain works in progress, items out for review, multiple versions of designs or any form of cruft.

That means

* Never work directly on Master
* Individual team members do not push their work directly to Master
* Do not have more than one Master branch
* All branches are a descendant of Master branch

### Tip No. 2: Stay in your lane

A basic Git best practice is that your work — any alterations or new additions — only travels up the tree toward Master. Likewise, other people’s work only travels down the tree toward you. No side quests. No merging two branches together. Only push up.

Additionally, each user is responsible for keeping current with changes made by others. That means always pull down updates before pushing work up. The result is that your branch has all current work of others plus your changes before you merge up.

So why do this? Why can’t I just close my eyes and hit the “Merge” button? Why! Things go wrong sometimes, namely merge conflicts. That is the result of two people working on the same item. Eg, a person on one branch opens an artboard and adds a header. Another on their branch opens the same art board and adds a footer.

All y’all will need to sort this all out when merging. Conflict resolution needs to happen down the tree on your branch to avoid munging the whole project.

### Tip No. 3: Feature branches

When working on a new feature, create a branch for that feature and name the branch after it. For example, if you are adding a dialog box for registration, you might create a branch registration dialog box. This is where all work on this feature will take place — with a caveat.

More than one person should not work on a branch. If multiple people are working on a feature, they should create their own branch to work off of that first feature branch — eg registration dialog box buttons and push their changes to registration dialog box as needed. Then, when work is complete, the entire feature is pushed up.

## Putting it together into a workflow

It’s easy to describe these principles in the abstract — see what I did there? — but they really are just guidelines for building an overall workflow.

We start here with a `Master` branch. This will serve as our source of truth for the entire project, so every branch we make will descend from it. But we also want to protect the `Master` branch.

<figure class="blog-image-insert">
    <img src="/siteart/abstract-master.jpg" alt="Image of a Sketch file with and Abstract logo and a halo, to show it is a protected file.">
</figure>

The first step is to make a `Development` branch off of Master. (You can call it whatever you want — Design, Working, etc. `Development` is simply commonly used.) This will be the branch that the team will work off of. This is the branch they will create feature branches from, and this is the branch that they will merge their own work into when it is complete.

<figure class="blog-image-insert">
    <img src="/siteart/abstract-development.jpg" alt="The master branch icon with an arrow pointing downward to a newly created Development branch.">
</figure>

From `Development`, the team members create feature branches — `Homescreen` and `Profile page` — for the various features being implemented. And they get work.


<figure class="blog-image-insert">
    <img src="/siteart/abstract-feature-branch.jpg" alt="A diagram that shows Master branch at the top, Development below that and two branches off development.">
</figure>

Once work has gone on for awhile, you will have a situation that looks something like this. `Master` and `Development` are in sync. However, as work has been committed to them, the two feature branches have drifted apart.

<figure class="blog-image-insert">
    <img src="/siteart/abstract-feature-branch-unequal.jpg" alt="The diagram shows that Master and Development are still in sync, but Home Screens and Profile page are out of sync with Development as well as each other.">
</figure>

How to get them back in sync? Everyone just merges their work upward to `Development`, right? No. Recall that your work goes upward, but everyone else’s work comes downward to you.

So, the `Home screens` branch is merged upward to `Development`.

<figure class="blog-image-insert">
    <img src="/siteart/abstract-feature-branch-push-up.jpg" alt="Diagram shows an arrow pointing upward from the Home Screens branch to the Development branch.">
</figure>

And then you have a situation that looks like this. `Development` and `Home screens` are in sync and they are out of sync with `Master` and `Profile Page`.

<figure class="blog-image-insert">
    <img src="/siteart/abstract-feature-branch-unequal-2.jpg" alt="Diagram shows that Development and Home Screens are in sync, and Home Screens and Profile Page are out of sync.">
</figure>


Now, `Profile page` branch can pull down from `Development`, bringing the changes made in the `Home screens` branch down to the `Profile page` branch. If there are no conflicts or any other issues, we can be assured that the merge with `Development` will now go smoothly.

<figure class="blog-image-insert">
    <img src="/siteart/abstract-feature-branch-pull-down.jpg" alt="Diagram shows that Development and Home Screens are in sync, and Home Screens and Profile Page are out of sync.">
</figure>
 
Finally, `Profile page` is merged into `Development`.

<figure class="blog-image-insert">
    <img src="/siteart/abstract-feature-branch-pull-down.jpg" alt="Diagram shows that Development and Home Screens are in sync, and Home Screens and Profile Page are out of sync.">
</figure>

If additional changes need to be made or designs need to be iterated on, make new branches off of `Development`. Only when the work is complete and final, `Development` is merged up into Master.

<figure class="blog-image-insert">
    <img src="/siteart/abstract-master-push-up.jpg" alt="Diagram shows that Development and Home Screens are in sync, and Home Screens and Profile Page are out of sync.">
</figure>

## Top Tip Bonus Round

A few more tips to get the most out of Abstract

* Are you flying solo on a project? Version control in Abstract will help you keep your work organized. It’s also good to adhere to best practices even if you are the only one.
* Take advantage of layers in Sketch to avoid conflicts in Abstract and to further organize your project. A single document with dozens of artboards will quickly get out of control.
* Restart Abstract every couple of days. It just seems to run better when I do.

[1]: https://www.sketch.com/
[2]: https://en.wikipedia.org/wiki/Version_control
[3]: https://git-scm.com/
[4]: https://www.abstract.com/
[5]: https://media.giphy.com/media/D1eUDCHZ1csQE/giphy.gif
[6]: https://www.youtube.com/watch?v=eOUvywQpoDI
[7]: https://en.wikipedia.org/wiki/Git_(slang)
[8]: https://roll20.net/compendium/dnd5e/Bag%20of%20Holding#content
[9]: https://www.youtube.com/watch?v=UBhQhKWOZmk