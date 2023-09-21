/*
Till now we used two external libraries which are 
fs and express now we will learn to use another library known as
fetch
*/
function callbackfn(result)
{
    console.log(result);
}
var secondobj = {
    method: "GET",
};



/*fetch("http://localhost:3000/q?x=10",secondobj).then(callbackfn)*/




/*
the fetch function takes to two arguments 
URL which it needs to hit
and an object
since fetch is defined in such a way that it returns in the form of promise
we use then() function. This results in calling the callback function after 
the process of fetch is completed
*/
/*
After running the above code (which is now commented) it will log us some
complicated object stuff which basically result itself
*/
/*
Now let's see how we can access the body
*/
function logresponsebody(jsonbody)
{
    console.log(jsonbody);
}
function callbackfn2(result)
{
    result.json().then(logresponsebody);
}
fetch("http://localhost:3000/q?x=10",secondobj).then(callbackfn2)
/*
here what we are doing is we are telling the code to execute the fetch function
The fetch() method returns a Promise that resolves to a Response object which will
then be parsed as an argument to callbackfn2
then inside callbackfn2 the response object which is now stored in result
we will call json() from the result object which then returns 
a promise which resolves with the result of parsing the body text as JSON
Now this JSON will be parsed as an argument into logresponsebody function
now inside logresponsebody function the json will be stored in jsonbody variable
and then gets logged to the console
*/