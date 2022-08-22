pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Subscriber {
    struct Document {
        string dateTime;
        string secret;
        address owner;
        string nftPath;
    }
    
    //uint addressRegistryCount;

    mapping (string =>Document[]) documents;
    string[] public _document_key;
    

     function addDocument (string[] memory _key, string memory dateTime, string memory secret, address owner1, string memory nftPath) public {
         for (uint i=0; i<_key.length; i++){
            documents[_key[i]].push(Document(dateTime, secret, owner1, nftPath));
            _document_key.push(string(_key[i]));
         }
     }


     function getDocumentByKey (string memory _key, string memory secret) public view returns ( Document[] memory ) {
          Document[] memory arrayDocument;
          Document[] memory arrayRawDocument = documents[_key];
          uint counter = 0;
         if (keccak256(bytes(secret)) == keccak256(bytes(""))){
             return arrayRawDocument;
         }else{
            for (uint i=0; i<arrayRawDocument.length; i++) {
                if (keccak256(bytes(arrayRawDocument[i].secret)) == keccak256(bytes(secret))){
                    arrayDocument[counter] = arrayRawDocument[i];
                    counter++;
                }
            }
            return arrayDocument;
         }
    }
}