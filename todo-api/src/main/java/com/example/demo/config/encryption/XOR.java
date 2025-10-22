package com.example.demo.config.encryption;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class XOR {
    private final byte[] key;

    public XOR(String key) {
        this.key = key.getBytes(StandardCharsets.UTF_8);
    }

    public String encode(String plainText) {
        byte[] textBytes = plainText.getBytes(StandardCharsets.UTF_8);
        byte[] result = new byte[textBytes.length];

        for (int i = 0; i < textBytes.length; i++) {
            result[i] = (byte) (textBytes[i] ^ key[i % key.length]);
        }

        return Base64.getEncoder().encodeToString(result);
    }

    public String decode(String encryptedText) {
        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedText);
        byte[] result = new byte[encryptedBytes.length];

        for (int i = 0; i < encryptedBytes.length; i++) {
            result[i] = (byte) (encryptedBytes[i] ^ key[i % key.length]);
        }

        return new String(result, StandardCharsets.UTF_8);
    }

    public boolean match(String plainText, String encryptedText) {
        String decrypted = decode(encryptedText);
        return decrypted.equals(plainText);
    }
}
