package com.spendwisepro.server.creditcardicon;

import com.spendwisepro.common.entity.CreditCardIcon;
import com.spendwisepro.common.exception.CreditCardIconNotFoundException;
import com.spendwisepro.server.files.AmazonS3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/credit_card_icons")
public class CreditCardIconRestController {

    private final CreditCardIconServiceImpl creditCardIconService;


    @GetMapping("/all")
    public List<CreditCardIcon> getAllCreditCardIcons() {
        return creditCardIconService.getAllCreditCardIcons();
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveCreditCardIcon(CreditCardIcon creditCardIcon, @RequestParam("fileImage") MultipartFile multipartFile) throws IOException {
        if (!multipartFile.isEmpty()) {
            String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
            creditCardIcon.setImage(fileName);

            CreditCardIcon savedCreditCardIcon = creditCardIconService.saveCreditCardIcon(creditCardIcon);
            String uploadDir = "credit-card-icons/" + savedCreditCardIcon.getId();

            AmazonS3Util.removeFolder(uploadDir);
            AmazonS3Util.uploadFile(uploadDir, fileName, multipartFile.getInputStream());
        } else {
            creditCardIconService.saveCreditCardIcon(creditCardIcon);
        }

        return ResponseEntity.ok("Credit card icon saved.");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCreditCardIcon(@PathVariable Long id) {
        try {
            creditCardIconService.deleteCreditCardIcon(id);
            String creditCardIconDir = "credit-card-icons/" + id;
            AmazonS3Util.removeFolder(creditCardIconDir);
        } catch (CreditCardIconNotFoundException exception) {
            return ResponseEntity.ok(exception.getMessage());
        }
        return ResponseEntity.ok("Credit card icon deleted successfully");
    }
}
