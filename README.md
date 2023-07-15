1. npm install react-hook-form
2. npm install axios
3. npm install js-cookie
4. npm install --save-dev @types/js-cookie

5. add package json to handle axios error jest
  "jest": {
    "moduleNameMapper": {
      "axios": "axios/dist/node/axios.cjs"
    }
  },