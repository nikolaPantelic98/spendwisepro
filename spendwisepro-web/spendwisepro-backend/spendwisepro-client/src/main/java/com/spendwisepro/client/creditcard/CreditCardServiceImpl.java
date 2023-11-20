package com.spendwisepro.client.creditcard;

import com.spendwisepro.client.security.jwt.JwtService;
import com.spendwisepro.client.user.UserRepository;
import com.spendwisepro.common.entity.CreditCard;
import com.spendwisepro.common.entity.User;
import com.spendwisepro.common.exception.CreditCardNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CreditCardServiceImpl implements CreditCardService{

    private final CreditCardRepository creditCardRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;


    @Override
    public List<CreditCard> getAllCreditCards(String token) {
        String username = jwtService.extractUsernameForAuthentication(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }
        User authenticatedUser = user.get();

        return creditCardRepository.findAllCreditCards(authenticatedUser.getId(), Sort.by("type"));
    }

    @Override
    public CreditCard saveCreditCard(CreditCard creditCard, String token) {
        String username = jwtService.extractUsernameForAuthentication(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }

        User userToSave = user.get();

        creditCard.setUser(userToSave);
        creditCard.setAmount(0F);

        return creditCardRepository.save(creditCard);
    }

    @Override
    public void updateCreditCard(Long creditCardId, CreditCard creditCard, String token) {
        String username = jwtService.extractUsernameForAuthentication(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }

        User authenticatedUser = user.get();

        CreditCard existingCreditCard = creditCardRepository.findCreditCardById(creditCardId, authenticatedUser.getId());

        if (creditCard.getAmount() != null) {
            existingCreditCard.setAmount(creditCard.getAmount());
        }
        if (creditCard.getType() != null) {
            existingCreditCard.setType(creditCard.getType());
        }
        if (creditCard.getBank() != null) {
            existingCreditCard.setBank(creditCard.getBank());
        }
        if (creditCard.getNote() != null) {
            existingCreditCard.setNote(creditCard.getNote());
        }
        if (creditCard.getIcon() != null) {
            existingCreditCard.setIcon(creditCard.getIcon());
        }

        creditCardRepository.save(existingCreditCard);
    }

    @Override
    public CreditCard getCreditCardById(Long creditCardId, String token) {
        String username = jwtService.extractUsernameForAuthentication(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }

        User authenticatedUser = user.get();

        return creditCardRepository.findCreditCardById(creditCardId, authenticatedUser.getId());
    }

    @Override
    public void deleteCreditCard(Long creditCardId, String token) throws CreditCardNotFoundException {
        String username = jwtService.extractUsernameForAuthentication(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }

        User authenticatedUser = user.get();

        Long countById = creditCardRepository.countById(creditCardId);

        if (countById == null || countById == 0) {
            throw new CreditCardNotFoundException("Could not find any credit card with id " + creditCardId);
        }

        creditCardRepository.deleteCreditCardById(creditCardId, authenticatedUser.getId());
    }
}
