var apiKey = "P26QSA5BNV7nRMxV2CiQi3xhm8hqsBbi4Bo4zXBw";

// You can specify individual search indices in requests, as shown in the following example:
"http://webservices.amazon.com/onca/xml?" +  
"Service=AWSECommerceService&" + 
"AWSAccessKeyId=[AWS Access Key ID]&" +
"AssociateTag=[Associate ID]&" +
"Operation=ItemSearch&" +
"Condition=All&" +
"ResponseGroup=Images&" +
"SearchIndex=Apparel&" +
"Title=Harry%20Potter&" +
"Timestamp=[YYYY-MM-DDThh:mm:ssZ]&" +
"Signature=[Request Signature]"


//Product Advertising API REST requests are URLs. The following example is an ItemSearch request.
"http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&Operation=ItemSearch&" +
"AWSAccessKeyId=" + apiKey + "&&SearchIndex=FashionMen&" +
"Keywords=business%20suits&Timestamp=[YYYY-MM-DDThh:mm:ssZ]&Signature=[Request Signature]"