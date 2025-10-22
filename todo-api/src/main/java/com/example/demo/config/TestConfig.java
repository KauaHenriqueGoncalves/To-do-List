package com.example.demo.config;

import com.example.demo.config.encryption.XOR;
import com.example.demo.entities.Collection;
import com.example.demo.entities.Item;
import com.example.demo.entities.User;
import com.example.demo.repository.CollectionRepository;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.LoginService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.Arrays;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private XOR xor;

    @Override
    public void run(String... args) throws Exception {
        User user = new User();
        user.setName("admin");
        user.setPassword(xor.encode("admin-123"));

        User user1 = new User();
        user1.setName("Todo Poderoso");
        user1.setPassword(xor.encode("12345678"));

        user = userRepository.save(user);
        user1 = userRepository.save(user1);

        Collection collection1 = new Collection();
        collection1.setName("Tarefas de casa");
        collection1.setUser(user1);

        Collection collection2 = new Collection();
        collection2.setName("Tabalhos da escolinha");
        collection2.setUser(user1);

        Collection collection3 = new Collection();
        collection3.setName("Tasks Business");
        collection3.setUser(user);

        collection1 = collectionRepository.save(collection1);
        collection2 = collectionRepository.save(collection2);
        collection3 = collectionRepository.save(collection3);

        Item item1 = new Item();
        item1.setCheck(false);
        item1.setName("Colher o coco do cachorro");
        item1.setCollection(collection1);

        Item item2 = new Item();
        item2.setCheck(false);
        item2.setName("Lavar os pratos");
        item2.setCollection(collection1);

        Item item3 = new Item();
        item3.setCheck(false);
        item3.setName("Fazer a tarefa de história");
        item3.setCollection(collection2);

        Item item4 = new Item();
        item4.setCheck(true);
        item4.setName("Vender um lote de abacate!");
        item4.setCollection(collection3);

        itemRepository.saveAll(Arrays.asList(
                item1,item2,item3,item4
        ));

        System.out.println("Console H2: http://localhost:8080/console-h2");
        System.out.println("Swagger: http://localhost:8080/swagger-ui.html");
    }
}
