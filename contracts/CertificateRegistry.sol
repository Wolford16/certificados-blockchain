// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CertificateRegistry
 * @dev Contrato para registrar hashes de certificados digitales y verificar su autenticidad.
 */
contract CertificateRegistry {
    address public owner;
    
    // Mapping de hash del certificado => bool (existe o no)
    mapping(string => bool) private certificates;

    // Evento emitido cuando un certificado es registrado
    event CertificateIssued(string hash, address indexed issuer);

    modifier onlyOwner() {
        require(msg.sender == owner, "Solo el propietario puede ejecutar esta funcion");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Registra un nuevo hash de certificado en la blockchain.
     * @param _hash El hash SHA-256 del certificado generado.
     */
    function issueCertificate(string memory _hash) public onlyOwner {
        require(!certificates[_hash], "El certificado ya ha sido registrado anteriormente");
        
        certificates[_hash] = true;
        
        emit CertificateIssued(_hash, msg.sender);
    }

    /**
     * @dev Verifica si un hash de certificado existe en el registro.
     * @param _hash El hash SHA-256 a verificar.
     * @return bool True si el certificado es valido y existe.
     */
    function verifyCertificate(string memory _hash) public view returns (bool) {
        return certificates[_hash];
    }
}
