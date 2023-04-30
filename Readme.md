-----Setup -----
using vite command we generated the app as
npm create vite@lates ./
./ to generate the project in the folder we are alread in

    ---------- assets folder
    the folder has been copied from the git source which contains all our asseets file
    ---------- constants
    it contain an array of string that will be used later in our project
    ---------- Index.css
    original Index.css is removed and with few basic twitches new one is setUpped
    --------Tailwind Setup
    from official docs visited framework guide and followed along the vite setup as
    run these cmds in terminal--
        npm install -D tailwindcss postcss autoprefixer
        npx tailwindcss init -p
        and also updated the tailwind.config file too
    -------- file saver dependecy
    npm i file-saver
    ------font file setup

-----------------------------------------------------------------STEP -1 ------ App.jsx Setup -------------------------
sabse phle react router dom s BrowserRouter, Link, Routes and Route ko import kie

uske baad pages naam ka folder banae h jisme mera 2 component h Home and Setpost aur indono ko index.js file ki help s export kra die so that they can be imported via just a single line statement

Imported logo from assets folder too
now App k ander k section p BrowserRouter chalega as isi ke andr hmara project h

Created a head section with logo on left and Create on right which redirects to "/create-post" link when called

Created a main section too where we have our actual routing working
Two routes for Home and setPost and setPost will also link to same path which we go by clicking on create button above

-------------------------------------------------------------------Pages Setup -----------------------------------------
