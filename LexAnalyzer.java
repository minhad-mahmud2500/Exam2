import java.util.regex.*;
import java.io.*;
import java.nio.file.*;
import java.io.IOException;
import java.util.LinkedList;
import java.util.Queue;
import java.util.HashMap;
public class lexAnalyzer{
    Queue<Integer> tokens = new LinkedList();
    HashMap<String,Integer> map = new HashMap<String, Integer>();
  public static void main(String[] args) {
    char[] word = new char[27];
    map.put("GO", 0); 
    map.put("CHIBI", 8); 
    map.put("MINI", 9); 
    map.put("SMALL", 10);
		map.put("REGULAR", 14);
    map.put("{", 16); 
    map.put("}", 17);   
    map.put("(", 18); 
		map.put(")", 19); 
		map.put("=", 20); 
    map.put("+", 21); 
		map.put("-", 22); 
		map.put("*", 23); 
    map.put("/", 24); 
		map.put("%", 25); 
		map.put("[", 26); 
    map.put("]", 27); 
		map.put(",", 28); 
    map.put("<", 29); 
		map.put(">", 30); 
		map.put("<=", 31); 
    map.put(">=", 32); 
    map.put("!=", 33); 
    map.put("==", 33);
    map.put("\"", 35); 
		map.put(".", 36); 
		map.put(" ", 37); 
    map.put("|", 38); 
    String parseThis, lex, word; 
    Pattern digit = Pattern.compile("([0-9]*[o,h,d,b]?)|([0-9]*[.].[0-9]*)"); 
    Pattern variable = Pattern.compile("[a-z]*[A-Za-z0-9_]*"); 
    Matcher digi = digit.matcher(lex); boolean isDigit = digit.find();
    Matcher variable = variable.matcher(lex); boolean isVariable = variable.find();
    Path yourcode = Path.of("./tests/one.txt");
    String code = Files.readString(yourcode);
    for (int i=0; i < code.length(); i++){
      char c = code.charAt(i);
      if (c == '>'|| c == '<'|| c== '!'|| c== '='){
        char d = code.charAt(i+1);
        if (d == '='){
          word.push(c); word.push(d); 
          lex = String.ValueOf(word);
          if (hashes.containsValue(lex)) tokens.add(hashes.get(lex)); 
          else tokens.add(13);
          word = null;
        }
        else tokens.add(13);
      }
      else if (c == '{'|| c =='}'|| c =='('|| c == ')'||c == '+'||c =='-'||c == '*'||c == '/'|| c == '%'||c =='['||c == ']'||c == ','||c == '\\' ||c == '.'||c == '|'){
       lex = String.valueOf(word);
        if (hashes.containsValue(lex)) tokens.add(hashes.get(lex)); 
        else tokens.add(13);
        word = null;
      }
      else if (c != ' ') word.push(c);
      else{
        lex = String.valueOf(word);
        word = null;
        if (isDigit) tokens.add(1);
        else if (isVariable) tokens.add(2);
        else if (hashes.containsValue(lex)) tokens.add(hashes.get(lex));  
        else tokens.add(13); 
      }
    }
    for (int j=0; j <tokens.size(); j++){
      System.out.print(j)
    }
}
   public static String makeItAWord(){}
 
 public static HashMap<String, Integer> makeTheMap(){
    HashMap<String, Integer> map = new HashMap<String, Integer>();
    
  } 
} 
