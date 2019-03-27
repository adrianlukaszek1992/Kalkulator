package main;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class CalculatorController {



    @GetMapping("/calculation")
    public double result(@RequestParam String firstNumber, String action, String secondNumber) {
        double firstNumberDouble = Double.parseDouble(firstNumber);
        double secondNumberDouble = Double.parseDouble(secondNumber);
        if(action.equals("add")){
            return firstNumberDouble+secondNumberDouble;
        }else if (action.equals("subtract")){
            return firstNumberDouble-secondNumberDouble;
        }else if (action.equals("multiply")){
            return firstNumberDouble*secondNumberDouble;
        }else{
            return firstNumberDouble/secondNumberDouble;
        }
    }
}
