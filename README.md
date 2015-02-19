# React Boston 2/18/15

**1 - starter**

How I like to start a React project.

**2 - react-ssr**

Basic server side rendering. For benchmarking.

**3 - mustache-ssr (node)**

**4 - mustache-ssr (go)**

SSR in Mustache as a comparison. Could create an 'isomorphic' workflow using shared templates. For benchmarking.

**5 - react-ssr-prod**

Server side rendering using a few best practices.

---

Everything runs on localhost:3000 w/ npm install && node server

# Run your own benchmarks!

cd 5-react-ssr-prod

NODE_ENV=production iojs server

ab -n 100 http://localhost:3000/
