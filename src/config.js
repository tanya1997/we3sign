export const contractAddress = "0x3935922f5397f8951601239e79a3165d10896a29"; // NFT smart contract Address


export const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_key",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "key",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner1",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "path1",
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
				"internalType": "string",
				"name": "_key",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "key",
				"type": "string"
			}
		],
		"name": "getDocumentByKey",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "key",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "path",
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