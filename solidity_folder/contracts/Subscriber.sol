pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Subscriber {
    struct Document {
        string key;
        address owner;
        string path;
    }
    
    //uint addressRegistryCount;

    mapping (string =>Document[]) documents;
    string[] public _document_key;
    

     function addDocument (string memory _key, string memory key, address owner1, string memory path1) public {
          documents[_key].push(Document(key, owner1, path1));
         _document_key.push(string(_key));
     }


     function getDocumentByKey (string memory _key, string memory key) public view returns ( Document[] memory ) {
          Document[] memory arrayDocument;
          Document[] memory arrayRawDocument = documents[_key];
          uint counter = 0;
         if (keccak256(bytes(key)) == keccak256(bytes(""))){
             return arrayRawDocument;
         }else{
            for (uint i=0; i<arrayRawDocument.length; i++) {
                if (keccak256(bytes(arrayRawDocument[i].key)) == keccak256(bytes(key))){
                    arrayDocument[counter] = arrayRawDocument[i];
                    counter++;
                }
            }
            return arrayDocument;
         }
    }
}

