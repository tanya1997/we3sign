export const contractAddress = "0x527374d5022bb4f763ce74fb6f50d4859b4a22ac"; // NFT smart contract Address


export const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_document_key",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_key",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "dateTime",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "secret",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner1",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "nftPath",
				"type": "string"
			}
		],
		"name": "addDocument",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_key",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "secret",
				"type": "string"
			}
		],
		"name": "getDocumentByKey",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "dateTime",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "secret",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "nftPath",
						"type": "string"
					}
				],
				"internalType": "struct Subscriber.Document[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];